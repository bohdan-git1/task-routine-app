import {delay, put, select} from 'redux-saga/effects'
import UserActions from "../Redux/UserRedux";
import {Actions} from 'react-native-router-flux'
import {isEmpty} from 'lodash'
import Permissions from 'react-native-permissions'
import {getCurrentGPSLocation, requestPermissions, showErrorMessage, showSettingsDialog} from "../Lib/Utilities";
import {PERMISSION_RESPONSES} from "../Lib/AppConstants";

export function * startup (api) {
  yield delay(500)
  const {user} = yield select(state => (state.user))
  if (!isEmpty(user) && user.token && !isEmpty(user.token)) {
    yield put(UserActions.loginSuccess(user))
  } else {
    Actions.home({type: 'reset'})
  }
    yield delay(1500)
    yield onGetCurrentLocation()
}

export function * onGetCurrentLocation(){
    const permissionStat = yield Permissions.check('location')
    if (permissionStat === PERMISSION_RESPONSES.AUTHORIZED) {
        yield handleAuthorizedLocationPermissions()
    } else {
        yield handleDeniedLocationPermissions(permissionStat)
    }
}

function * handleDeniedLocationPermissions(permissionType){
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

function * handleAuthorizedLocationPermissions() {
    console.tron.warn('inside authorized handling location')
    const location = yield getCurrentGPSLocation().then(res => res)
    console.tron.warn(location)
    if(location && location.latitude && location.longitude) {
        yield put(UserActions.getCurrentLocationSuccess(location))
    } else {
        yield put(UserActions.getCurrentLocationFailure('something went wrong while getting current location.'))
    }
}
