import {call, put} from 'redux-saga/effects'
import ConfigActions from '../Redux/ConfigRedux'
import Api from '../Services/ApiCaller'

export function * onGetConfig (api) {
  try {
    const {res} = yield call(Api.callServer, api.getConfig, {}, false)
    yield put(ConfigActions.getConfigSuccess(res))
  } catch (e) {
    yield put(ConfigActions.getConfigFailure(e.message))
  }
}
