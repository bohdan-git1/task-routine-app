import {call, put} from 'redux-saga/effects'
import RouteActions from '../Redux/RouteRedux'
import Api from '../Services/ApiCaller'
import {showMessage} from "../Lib/Utilities";

export function* onCreateRoute(api, {route}) {
    try {
        const {res} = yield call(Api.callServer, api.createRoute, route, true)
        const {isSuccess, error, data} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.createRouteSuccess(res.data))
            showMessage('New route created successfully')
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.createRouteFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.createRouteFailure(e.message))
    }
}


export function* onGetRoutes(api, {params}) {
    try {
        const {res} = yield call(Api.callServer, api.getRoutes, params, true)
        const {isSuccess, error, items = []} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.getRoutesSuccess(items))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.getRoutesFailure(e.message))
        }
    } catch (e) {
        yield put(RouteActions.getRoutesFailure(e.message))
    }
}
