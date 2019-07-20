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
            Actions.tabbar({type: 'reset'})
        }
    } catch (e) {
        yield put(UserActions.loginFailure(e.message))
    }
}

export function* onLoginSuccess(api, {user}) {
    try {
        const {token = ''} = user || {}
        api.setHeaders({'x-access-token': token})
    } catch (e) {
        console.tron.warn(e)
    }
}


export function* onVerifyPin(api, {info}) {
    try {
        const {res} = yield call(Api.callServer, api.verifyPinCode, info, true)
        if (res && res.isSuccess) {
            yield put(UserActions.verifyPinSuccess(res.data))
            Actions.profileInfo()
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
        }
    } catch (e) {
        yield put(UserActions.resendPinFailure(e.message))
    }
}


export function* onAddProfile(api, {userId, info}) {
    try {
        const {res} = yield call(Api.callServer, api.addProfile, info, true, userId)
        if (res && res.isSuccess) {
            Actions.tabbar({type: 'reset'})
            yield put(UserActions.addProfileSuccess(res.data))
        }
    } catch (e) {
        yield put(UserActions.addProfileFailure(e.message))
    }
}