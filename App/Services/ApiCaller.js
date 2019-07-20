import {isConnected, showMessage} from '../Lib/Utilities'
import {call, put, select} from 'redux-saga/effects'
import * as _ from 'lodash'
import UserActions from '../Redux/UserRedux'

function * callServer (apiFunction, reqData, showError = false, id = null) {
  if (isConnected) {
    const response = yield call(apiFunction, reqData, reqData.id || id)
    // if (__DEV__)console.tron.log({ApiResponse : response});
    // if (__DEV__)console.log({ApiResponse : response});
    const {status, data: resData, ok = false, problem = 'TIMEOUT_ERROR'} = response || {}

    if (ok && status && status >= 200 && status <= 300) {
      return {error: false, res: resData, statusCode: status}
    } else {
      let message = ''
      if (resData) {
        if (typeof resData.error === 'object' && resData.error.message) {
          message = resData.error.message
        } else if (resData.message) {
          message = resData.message
        } else if (resData.msg) {
          message = resData.msg
        } else if (_.isString(resData)) {
          message = resData
        } else {
          message = getMessage(resData)
        }
      } else {
        message = getMessage(problem)
      }
      if (showError) {
        showMessage(message)
      }
      if (status === 401) {
        const {token} = yield select(state => state.user)
        if (token) {
          yield put(UserActions.logoutRequest())
        }
      }
      const {data = {}} = resData
      throw {error: true, message, statusCode: status, data}
    }
  } else {
    const message = 'Network Error. No internet connection.'
    if (showError) {
      showMessage(message)
    }
    throw {error: true, message, statusCode: 503}
  }
}

const getMessage = (error) => {
  if (error === 'TIMEOUT_ERROR') {
    return 'No Response From Server.'
  } else if (error === 'CONNECTION_ERROR') {
    return 'Server Is Not Available.'
  } else if (error === 'NETWORK_ERROR') {
    return 'Network not available.'
  } else {
    return 'Something went wrong. Please try again'
  }
}

export default {
  callServer
}
