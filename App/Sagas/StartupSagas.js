import {delay, put, select} from 'redux-saga/effects'
import UserActions from "../Redux/UserRedux";
import ConfigActions from "../Redux/ConfigRedux";
import {Actions} from 'react-native-router-flux'
import {Alert, PermissionsAndroid, Platform} from 'react-native'
import {isEmpty} from 'lodash'
import Permissions from 'react-native-permissions'
import {getCurrentGPSLocation, requestPermissions, showSettingsDialog} from "../Lib/Utilities";
import {PERMISSION_RESPONSES} from "../Lib/AppConstants";
import Contacts from "react-native-contacts";
import CalendarActions from "../Redux/CalendarRedux";

export function* startup(api) {
    yield delay(500)
    const {user} = yield select(state => (state.user))
    if (!isEmpty(user) && user.token && !isEmpty(user.token)) {
        yield put(UserActions.loginSuccess(user))
        yield delay(500)
        yield put(CalendarActions.getAllTasks())
        yield put(UserActions.fetchMe())
    } else {
        Actions.home({type: 'reset'})
    }
    yield delay(1500)
    yield onGetCurrentLocation()
    yield fetchContacts();
}



const getAllContacts = () => new Promise(async (resolve, reject) => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            ]);
            if (
                granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.tron.warn('granted permissions')
            } else {
                Alert.alert("Permissions Denied. Please restart app and grant permissions.");

            }
        }
        Contacts.getAll((err, fetchedContactsList) => {
            if (err === "denied") {
                throw new Error('denied getting contacts.')
            } else {
                let dataObject = []
                let finalizedContacts = []
                fetchedContactsList.map(val => {
                    let tempObject = val
                    if (val.recordID) {
                        if (val.givenName && !val.middleName && !val.familyName) {
                            tempObject.name = val.givenName
                        } else if (val.givenName && val.middleName && !val.familyName) {
                            tempObject.name = val.givenName + " " + val.middleName
                        } else if (val.givenName && !val.middleName && val.familyName) {
                            tempObject.name = val.givenName + " " + val.familyName
                        } else if (val.givenName && val.middleName && val.familyName) {
                            tempObject.name = val.givenName + " " + val.middleName + " " + val.familyName
                        } else if (!val.givenName && val.middleName && !val.familyName) {
                            tempObject.name = val.middleName
                        } else if (!val.givenName && val.middleName && val.familyName) {
                            tempObject.name = val.middleName + " " + val.familyName
                        } else if (!val.givenName && !val.middleName && val.familyName) {
                            tempObject.name = val.familyName
                        }
                    }

                    finalizedContacts.push(tempObject)
                });

                /**
                 * @description sorts @param data array of objects alphabetically based on names while keeping corresponding IDs in the same object.
                 */
                finalizedContacts.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                });
                resolve(finalizedContacts.map(item => {
                    const { recordID, name, phoneNumbers: { 0: {number = ''} = {} } = []} = item
                    return {recordID, name, phone: number}
                }))
            }
        })
    } catch (e) {
        reject (e)
    }
})

function* fetchContacts () {
    if (Platform.OS === 'android') {
        yield delay(3000)
    }
    const contacts = yield getAllContacts()
    yield put(ConfigActions.setContactsData(contacts))
}

export function* onGetCurrentLocation() {
    const permissionStat = yield Permissions.check('location')
    if (permissionStat === PERMISSION_RESPONSES.AUTHORIZED) {
        yield handleAuthorizedLocationPermissions()
    } else {
        yield handleDeniedLocationPermissions(permissionStat)
    }
}

function* handleDeniedLocationPermissions(permissionType) {
    const isNeverAskedAgain = (permissionType === PERMISSION_RESPONSES.DENIED && Platform.OS === 'ios') || permissionType === PERMISSION_RESPONSES.RESTRICTED
    const yetNotAsked = permissionType === PERMISSION_RESPONSES.UNDETERMINED
    if (yetNotAsked) {
        const res = yield requestPermissions('location')
        if (res === PERMISSION_RESPONSES.AUTHORIZED) {
            yield handleAuthorizedLocationPermissions()

        } else {
            // showErrorMessage('unable to get current location for your device. please check your location settings and try later.')
            yield put(UserActions.getCurrentLocationFailure('unable to get current location for your device. please check your location settings and restart app.'))
        }
    } else if (isNeverAskedAgain) {
        showSettingsDialog(
            I18n.t('locationPermissionTitle'),
            I18n.t('locationPermissionMsg'),
        )
        yield delay(300)
        yield put(UserActions.getCurrentLocationFailure('unable to get current location for your device. please check your location settings and restart app.'))
    }
}

function* handleAuthorizedLocationPermissions() {
    const location = yield getCurrentGPSLocation().then(res => res)
    if (location && location.latitude && location.longitude) {
        yield put(UserActions.getCurrentLocationSuccess(location))
    } else {
        yield put(UserActions.getCurrentLocationFailure('something went wrong while getting current location.'))
    }
}
