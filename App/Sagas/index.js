import {all, takeLatest} from 'redux-saga/effects'
import API from '../Services/Api'
// Types
import {StartupTypes} from '../Redux/StartupRedux'
import {UserTypes} from '../Redux/UserRedux'
import {CalendarTypes} from '../Redux/CalendarRedux'
import {FamilyTypes} from "../Redux/FamilyRedux";
import {FolderTypes} from "../Redux/FolderRedux";
import {RouteTypes} from "../Redux/RouteRedux";
import {BudgetTypes} from "../Redux/BudgetRedux";
import {LocatorTypes} from "../Redux/LocatorRedux";
// generator Handlers
import {onGetCurrentLocation, startup} from './StartupSagas'
import {onAddNewTask, onDeleteTask, onGetAllTasks, onGetTaskDetails} from './CalendarSagas'
import {
    logout,
    onAddProfile,
    onEditProfile, onFetchMe,
    onLogin,
    onLoginSuccess,
    onResendPin,
    onSignUp,
    onVerifyPin
} from './UserSagas'
import {onChangeFamilyPermissions, onCreateFamily, onFetchFamily, onGetFamilyPermissions} from "./FamilySagas";
//api urls
import {onCreateFolder, onDeleteFolder, onGetFolders, onUpdateFolder} from "./FolderSagas";
import {onAddCategory, onAddNewBudget, onGetAllCategories} from "./BudgetSagas";
import {
    onCreateRoute,
    onDeleteRoute,
    onGetActiveRoute,
    onGetRoutes,
    onGetSpecificRoute,
    onUpdateRouteStatus,
    onUpdateTaskStatus
} from "./RouteSagas";
import {onAddLocation, onGetAllLocations} from "./LocatorSagas";

/* ------------- Types ------------- */
/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        // some sagas only receive an action
        takeLatest(StartupTypes.STARTUP, startup, api),
        takeLatest(UserTypes.SIGN_UP, onSignUp, api),
        takeLatest(UserTypes.LOGIN, onLogin, api),
        takeLatest(UserTypes.FETCH_ME, onFetchMe, api),
        takeLatest(UserTypes.LOGIN_SUCCESS, onLoginSuccess, api),
        takeLatest(UserTypes.VERIFY_PIN, onVerifyPin, api),
        takeLatest(UserTypes.RESEND_PIN, onResendPin, api),
        takeLatest(UserTypes.ADD_PROFILE, onAddProfile, api),
        takeLatest(UserTypes.EDIT_PROFILE, onEditProfile, api),
        takeLatest(UserTypes.LOGOUT, logout, api),
        takeLatest(UserTypes.GET_CURRENT_LOCATION, onGetCurrentLocation, api),

        // Calendar
        takeLatest(CalendarTypes.ADD_NEW_TASK, onAddNewTask, api),
        takeLatest(CalendarTypes.GET_ALL_TASKS, onGetAllTasks, api),
        takeLatest(CalendarTypes.GET_TASK_DETAILS, onGetTaskDetails, api),
        takeLatest(CalendarTypes.DELETE_TASK, onDeleteTask, api),

        // Family
        takeLatest(FamilyTypes.CREATE_FAMILY, onCreateFamily, api),
        takeLatest(FamilyTypes.FETCH_FAMILY, onFetchFamily, api),
        takeLatest(FamilyTypes.GET_FAMILY_PERMISSIONS, onGetFamilyPermissions, api),
        takeLatest(FamilyTypes.CHANGE_FAMILY_PERMISSIONS, onChangeFamilyPermissions, api),

        //Folders
        takeLatest(FolderTypes.GET_FOLDERS, onGetFolders, api),
        takeLatest(FolderTypes.CREATE_FOLDER, onCreateFolder, api),
        takeLatest(FolderTypes.UPDATE_FOLDER, onUpdateFolder, api),
        takeLatest(FolderTypes.DELETE_FOLDER, onDeleteFolder, api),

        //Route
        takeLatest(RouteTypes.CREATE_ROUTE, onCreateRoute, api),
        takeLatest(RouteTypes.GET_ROUTES, onGetRoutes, api),
        takeLatest(RouteTypes.UPDATE_ROUTE_STATUS, onUpdateRouteStatus, api),
        takeLatest(RouteTypes.UPDATE_TASK_STATUS, onUpdateTaskStatus, api),
        takeLatest(RouteTypes.DELETE_ROUTE, onDeleteRoute, api),
        takeLatest(RouteTypes.GET_SPECIFIC_ROUTE, onGetSpecificRoute, api),
        takeLatest(RouteTypes.GET_ACTIVE_ROUTE, onGetActiveRoute, api),

        //Budget
        takeLatest(BudgetTypes.GET_ALL_CATEGORIES, onGetAllCategories, api),
        takeLatest(BudgetTypes.ADD_CATEGORY, onAddCategory, api),
        takeLatest(BudgetTypes.ADD_NEW_BUDGET, onAddNewBudget, api),

        //Locator
        takeLatest(LocatorTypes.GET_ALL_LOCATIONS, onGetAllLocations, api),
        takeLatest(LocatorTypes.ADD_LOCATION, onAddLocation, api),

    ])
}
