import {call, put} from 'redux-saga/effects'
import FamilyActions from '../Redux/FamilyRedux'
import Api from '../Services/ApiCaller'
import {showMessage} from "../Lib/Utilities";

export function* onCreateFamily(api, { name, invites }) {
    try {
        const { res } = yield call(Api.callServer, api.createFamily, { name, invites }, true)
        if (res && res.isSuccess) {
            yield put(FamilyActions.createFamilySuccess(res.data))
        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(FamilyActions.createFamilyFailure({}))
        }
    } catch (e) {
        yield put(FamilyActions.createFamilyFailure(e.message))
    }
}

export function* onFetchFamily (api, { familyId }) {
    try {
        const { res } = yield call(Api.callServer, api.fetchFamily, { familyId }, true)

        if (res && res.isSuccess) {
            yield put(FamilyActions.fetchFamilySuccess(res.data))

        } else {
            if (res.error && typeof res.error === "string") {
                showMessage(res.error)
            }
            yield put(FamilyActions.fetchFamilyFailure())
        }
    } catch (e) {
        yield put(FamilyActions.fetchFamilyFailure(e.message))
    }
}
