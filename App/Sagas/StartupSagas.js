import {delay, put, select} from 'redux-saga/effects'
import UserActions from "../Redux/UserRedux";
import {Actions} from 'react-native-router-flux'
import {isEmpty} from 'lodash'

export function * startup (api) {
  yield delay(2000)
  const {user} = yield select(state => (state.user))

  if (!isEmpty(user)) {
    yield put(UserActions.loginSuccess(user))
    Actions.tabbar({type: 'reset'})
  } else {
    Actions.login({type: 'reset'})
  }
}
