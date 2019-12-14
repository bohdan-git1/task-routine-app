import {call, put} from 'redux-saga/effects'
import LocatorActions from '../Redux/LocatorRedux'
import Api from '../Services/ApiCaller'


export function* onGetAllLocations(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.getLocations, params, true)
        if (res && res.isSuccess) {
            yield put(LocatorActions.getAllLocationsSuccess(res.items))
        }
    } catch (e) {
        yield put(LocatorActions.getAllLocationsFailure(e.message))
    }
}

export function* onAddLocation(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.addLocation, params, true)
        if (res && res.data) {
            yield put(LocatorActions.addLocationSuccess(res.data))
        }
    } catch (e) {
        yield put(LocatorActions.addLocationFailure(e.message))
    }
}
