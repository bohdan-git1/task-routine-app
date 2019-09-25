import {call, put} from 'redux-saga/effects'
import RouteActions from '../Redux/RouteRedux'
import Api from '../Services/ApiCaller'
import {showMessage} from "../Lib/Utilities";
import strings from "../Constants/strings";
import { Actions} from "react-native-router-flux";

export function* onCreateRoute(api, {route}) {
    try {
        const {res} = yield call(Api.callServer, api.createRoute, route, true)
        const {isSuccess, error, data} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.createRouteSuccess(res.data))
            Actions.tabbar({type: 'reset'})
            showMessage(strings.newRouteCreated)
            yield put(RouteActions.getRoutes({status: null, sort: 'today'}))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.createRouteFailure(strings.somethingWentWrong))
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
            yield put(RouteActions.getRoutesFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.getRoutesFailure(e.message))
    }
}

export function* onGetActiveRoute(api, {params}) {
    try {
        const {res} = yield call(Api.callServer, api.getRoutes, params, true)
        const {isSuccess, error, items = []} = res || {}
        if (res && isSuccess) {
            const activeRoute = items && items.length ? items[0] : {}
            yield put(RouteActions.getActiveRouteSuccess(activeRoute))
            yield put(RouteActions.getSpecificRoute(activeRoute.id))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.getActiveRouteFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.getActiveRouteFailure(e.message))
    }
}

export function* onUpdateRouteStatus(api, {routeId, params, fetchAfterUpdate}) {
    const { status } = params
    try {
        const {res} = yield call(Api.callServer, api.updateRouteStatus, params, true, routeId)
        const {isSuccess, error, data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.updateRouteStatusSuccess(data, status))
            showMessage(status === 'active' ? strings.markedActive : strings.markedInActive)
            if(fetchAfterUpdate) {
                yield put(RouteActions.getSpecificRoute(routeId))
            }
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.updateRouteStatusFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.updateRouteStatusFailure(e.message))
    }
}

export function* onUpdateTaskStatus(api, {routeId, taskId, status, fetchAfterUpdate = true}) {
    try {
        const {res} = yield call(Api.callServer, api.updateTaskStatus, {routeId, status}, true, taskId)
        const {isSuccess, error} = res || {}
        console.tron.warn({updateTaskStatusRes: res})
        if (String(isSuccess) === 'true') {
            Actions.pop()
            showMessage(strings.markedTaskDone)
            yield put(RouteActions.updateTaskStatusSuccess())
            if(fetchAfterUpdate) {
                yield put(RouteActions.getSpecificRoute(routeId))
            }

        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.updateTaskStatusFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.updateTaskStatusFailure(e.message))
    }
}

export function* onDeleteRoute(api, {routeId}) {
    try {
        const {res} = yield call(Api.callServer, api.deleteRoute, routeId, true)
        const {isSuccess, error, message= '', data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.deleteRouteSuccess(routeId))
            showMessage(message)
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.deleteRouteFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.deleteRouteFailure(e.message))
    }
}

export function* onGetSpecificRoute(api, {routeId}) {
    try {
        const {res} = yield call(Api.callServer, api.getSpecificRoute, routeId, true)
        const {isSuccess, error, message= '', data = {}} = res || {}
        if (res && isSuccess) {
            yield put(RouteActions.getSpecificRouteSuccess(data))
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(RouteActions.getSpecificRouteFailure(strings.somethingWentWrong))
        }
    } catch (e) {
        yield put(RouteActions.getSpecificRouteFailure(e.message))
    }
}
