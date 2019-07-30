import {call, put} from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import Api from '../Services/ApiCaller'
import {Actions} from "react-native-router-flux";
import {showMessage} from "../Lib/Utilities";

export function* onSignUp(api, {info}) {
    try {
        const {res} = yield call(Api.callServer, api.signUpUser, info, true)
        if (res && res.isSuccess) {
            const {id: userId = ''} = res
            Actions.verifyPhone({userId})
            yield put(UserActions.signUpSuccess(res.data))
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(UserActions.signUpFailure({}))
        }
    } catch (e) {
        yield put(UserActions.signUpFailure(e.message))
    }
}

export function* onLogin(api, {info}) {
    try {
        const {res} = yield call(Api.callServer, api.signIn, info, true)
        if (res && res.isSuccess && res.data) {
            yield put(UserActions.loginSuccess(res.data))
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(UserActions.loginFailure({}))
        }
    } catch (e) {
        yield put(UserActions.loginFailure(e.message))
    }
}

export function* onLoginSuccess(api, {user}) {
    try {
        const {token = ''} = user || {}
        api.setHeaders({'x-access-token': token})
        Actions.tabbar({type: 'reset'})
    } catch (e) {
        //console.tron.warn(e)
    }
}


export function* onVerifyPin(api, {info}) {
    try {
        const {res} = yield call(Api.callServer, api.verifyPinCode, info, true)
        if (res && res.isSuccess) {
            yield put(UserActions.verifyPinSuccess(res.data))
            Actions.profileInfo({type: 'reset', isFromVerifyPin: true})
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(UserActions.verifyPinFailure({}))
        }
    } catch (e) {
        yield put(UserActions.verifyPinFailure(e.message))
    }
}

export function* onResendPin(api, {info}) {
    try {
        const {res} = yield call(Api.callServer, api.resendPinCode, info, true)
        if (res && res.isSuccess) {
            yield put(UserActions.resendPinSuccess(res.data))
            showMessage('No Pin sent Successfully')
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(UserActions.resendPinFailure({}))
        }
    } catch (e) {
        yield put(UserActions.resendPinFailure(e.message))
    }
}


export function* onAddProfile(api, {userId, info}) {
    try {
        const {res} = yield call(Api.callServer, api.addProfile, info, true, userId)
        if (res && res.isSuccess) {
            Actions.login({type: 'reset'})
            yield put(UserActions.addProfileSuccess(res.data))
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(UserActions.addProfileFailure({}))
        }
    } catch (e) {
        yield put(UserActions.addProfileFailure(e.message))
    }
}

export function* logout(api) {
    api.setHeaders({'Authorization': ''})
    Actions.login({type: 'reset'})
}
