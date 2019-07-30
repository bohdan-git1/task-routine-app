import {delay, put, select} from 'redux-saga/effects'
import UserActions from "../Redux/UserRedux";
import {Actions} from 'react-native-router-flux'
import {isEmpty} from 'lodash'

export function * startup (api) {
  yield delay(500)
  const {user} = yield select(state => (state.user))
  if (!isEmpty(user) && user.token && !isEmpty(user.token)) {
    yield put(UserActions.loginSuccess(user))
  } else {
    Actions.home({type: 'reset'})
  }
}
