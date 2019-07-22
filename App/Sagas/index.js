import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { CalendarTypes } from '../Redux/CalendarRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { onAddNewTask, onGetAllTasks, onGetTaskDetails, onDeleteTask } from './CalendarSagas'
import { onSignUp, onVerifyPin, onResendPin, onAddProfile, onLogin, onLoginSuccess, logout } from './UserSagas'
import {APP_URL} from "../Lib/AppConstants";

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
