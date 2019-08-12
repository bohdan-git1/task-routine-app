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
import {ConfigTypes} from "../Redux/ConfigRedux";

export function* startup(api) {
    yield delay(500)
    const {user} = yield select(state => (state.user))
    if (!isEmpty(user) && user.token && !isEmpty(user.token)) {
        yield put(UserActions.loginSuccess(user))
    } else {
        Actions.home({type: 'reset'})
    }
    yield delay(1500)
    yield onGetCurrentLocation()
    if (Platform.OS === "android") {
        yield this.requestContactPermissionAndroid();
        yield fetchContacts();
    } else {
        yield fetchContacts();
    }
}

const getAllContacts = () => new Promise((resolve, reject) => {
    try {
        if (Platform.OS === 'android') {
            const granted = PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            ]);
            console.tron.warn('contactsPermission: ' + String(granted))
            if (
                granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                this.setState({androidPermission: true});
            } else {
                Alert.alert("Permissions Denied. Please restart app and grant permissions.");
                throw new Error('rejected contacts permissions.')
            }
        }
        Contacts.getAll((err, fetchedContactsList) => {
            console.tron.warn({ err, fetchedContactsList })
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

                // let titles = [];
                //
                // /**
                //  * @description gets a list of unique characters @param titles based on sorted @param nameList.
                //  */
                // finalizedContacts.map(item => item.name).map((val, index, arr) => {
                //     // For array members with members after them, we compare them with the members after them.
                //     if (arr[index + 1]) {
                //         if (val[0] !== arr[index + 1][0]) {
                //             titles.push(val[0]);
                //         }
                //     }
                //     // For the last array member, we compare it with the member before it.
                //     else if (index === arr.length - 1) {
                //         if (val[0] !== arr[index - 1][0]) titles.push(val[0]);
                //     }
                // });
                //
                // // magic
                // for (let i = 0; i < titles.length; i++) {
                //     let currentObject = {
                //         title: titles[i],
                //         data: []
                //     };
                //     for (let j = 0; j < finalizedContacts.length; j++) {
                //         console.tron.warn({
                //             cond: finalizedContacts[j].name.toLowerCase().startsWith(titles[i].toLowerCase()),
                //             nameFirstLetter: finalizedContacts[j].name.toLowerCase(),
                //             titlesI: titles[i].toLowerCase()
                //         })
                //         if (finalizedContacts[j].name.toLowerCase().startsWith(titles[i].toLowerCase())) {
                //             currentObject.data.push(finalizedContacts[j]);
                //         }
                //     }
                //     dataObject.push(currentObject);
                // }

                resolve(finalizedContacts)
                console.tron.warn({ dataObject, finalizedContacts })
                // this.setState({ finalData: dataObject });
            }
        })
    } catch (e) {
        reject (e)
    }
})

function* fetchContacts () {
    const contacts = yield getAllContacts()
    console.tron.warn({contacts})
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
        console.tron.warn('permissionAskingRes: ' + res)
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
    console.tron.warn('inside authorized handling location')
    const location = yield getCurrentGPSLocation().then(res => res)
    console.tron.warn(location)
    if (location && location.latitude && location.longitude) {
        yield put(UserActions.getCurrentLocationSuccess(location))
    } else {
        yield put(UserActions.getCurrentLocationFailure('something went wrong while getting current location.'))
    }
}
