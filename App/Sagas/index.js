import {all, takeLatest} from 'redux-saga/effects'
import API from '../Services/Api'
import {StartupTypes} from '../Redux/StartupRedux'
import {UserTypes} from '../Redux/UserRedux'
import {CalendarTypes} from '../Redux/CalendarRedux'
import {startup} from './StartupSagas'
import {onAddNewTask, onDeleteTask, onGetAllTasks, onGetTaskDetails} from './CalendarSagas'
import {logout, onAddProfile, onLogin, onLoginSuccess, onResendPin, onSignUp, onVerifyPin} from './UserSagas'
import {APP_URL} from "../Lib/AppConstants";

/* ------------- Types ------------- */
/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create(APP_URL)

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(UserTypes.SIGN_UP, onSignUp, api),
    takeLatest(UserTypes.LOGIN, onLogin, api),
    takeLatest(UserTypes.LOGIN_SUCCESS, onLoginSuccess, api),
    takeLatest(UserTypes.VERIFY_PIN, onVerifyPin, api),
    takeLatest(UserTypes.RESEND_PIN, onResendPin, api),
    takeLatest(UserTypes.ADD_PROFILE, onAddProfile, api),
    takeLatest(UserTypes.LOGOUT, logout, api),
    // Calendar
    takeLatest(CalendarTypes.ADD_NEW_TASK, onAddNewTask, api),
    takeLatest(CalendarTypes.GET_ALL_TASKS, onGetAllTasks, api),
    takeLatest(CalendarTypes.GET_TASK_DETAILS, onGetTaskDetails, api),
    takeLatest(CalendarTypes.DELETE_TASK, onDeleteTask, api),

  ])
}
