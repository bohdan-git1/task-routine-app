import {call, put} from 'redux-saga/effects'
import BudgetActions from '../Redux/BudgetRedux'
import Api from '../Services/ApiCaller'
import {showMessage} from "../Lib/Utilities";


export function* onGetAllCategories(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.getCategories, params, true)
        if (res && res.isSuccess) {
            yield put(BudgetActions.getAllCategoriesSuccess(res.items))
        }
    } catch (e) {
        yield put(BudgetActions.getAllCategoriesFailure(e.message))
    }
}

export function* onAddCategory(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.addCategory, params, true)
        if (res && res.data) {
            yield put(BudgetActions.addCategorySuccess(res.data))
        }
    } catch (e) {
        yield put(BudgetActions.addCategoryFailure(e.message))
    }
}

export function* onAddNewBudget(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.addNewBudget, params, true)
        if (res && res.data) {
            showMessage('Added new category successfully')
            yield put(BudgetActions.addNewBudgetSuccess(res.data))
        }
    } catch (e) {
        yield put(BudgetActions.addNewBudgetFailure(e.message))
    }
}
