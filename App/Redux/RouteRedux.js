import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    createRoute: ['route'],
    createRouteSuccess: ['route'],
    createRouteFailure: ['error'],

    getRoutes: ['params'],
    getRoutesSuccess: ['routes'],
    getRoutesFailure: ['error'],

    getSpecificRoute: ['routeId'],
    getSpecificRouteSuccess: ['route'],
    getSpecificRouteFailure: ['error'],

    getActiveRoute: ['params'],
    getActiveRouteSuccess: ['activeRoute'],
    getActiveRouteFailure: ['error'],

    getActiveRouteTasks: ['params'],
    getActiveRouteTasksSuccess: ['activeRouteTasks'],
    getActiveRouteTasksFailure: ['error'],

    updateRouteStatus: ['routeId', 'params', 'fetchAfterUpdate'],
    updateRouteStatusSuccess: ['route', 'status'],
    updateRouteStatusFailure: ['error'],

    deleteRoute: ['routeId'],
    deleteRouteSuccess: ['routeId'],
    deleteRouteFailure: ['error'],

    updateTaskStatus: ['taskId', 'routeId', 'status', 'fetchAfterUpdate'],
    updateTaskStatusSuccess: null,
    updateTaskStatusFailure: null
})

export const RouteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    fetchingTasks: false,
    routes: [],
    route: {},
    activeRoute: {}
})

/* ------------- Reducers ------------- */

// Create New Route
export const createRoute = (state) => state.merge({fetching: true, route: {}})
export const createRouteSuccess = (state, {route}) => state.merge({fetching: false, error: null, route})
export const createRouteFailure = (state) => state.merge({fetching: false, error: true})

// Get Routes
export const getRoutes = (state) => state.merge({fetching: true})
export const getRoutesSuccess = (state, {routes}) => state.merge({fetching: false, error: null, routes})
export const getRoutesFailure = (state) => state.merge({fetching: false, error: true})

// Get  Active Routes
export const getActiveRoute = (state) => state.merge({fetching: true})
export const getActiveRouteSuccess = (state, {activeRoute}: Object) => state.merge({fetching: false, error: null, activeRoute})
export const getActiveRouteFailure = (state) => state.merge({fetching: false, error: true})

//Update Route Status
export const updateRouteStatus = (state) => state.merge({fetching: true})
export const updateRouteStatusSuccess = (state, {route, status}) =>{
   return state.merge({fetching: false, error: null, route,  activeRoute:  status === 'inactive' ? {} : state.activeRoute})
}
export const updateRouteStatusFailure = (state) => state.merge({fetching: false, error: true})

//Update Route Status
export const updateTaskStatus = (state) => state.merge({fetching: true})
export const updateTaskStatusSuccess = (state) => {return state.merge({fetching: false, error: null})}
export const updateTaskStatusFailure = (state) => state.merge({fetching: false, error: true})

//Delete Route
export const deleteRoute = (state) => state.merge({fetching: true})
export const deleteRouteSuccess = (state, {routeId}) =>{
    let routes = Immutable.asMutable(state.routes || [])
    routes = routes.filter(({id}) => String(id) !== String(routeId))
    let newRoute = state.route
    if(state.route.id === routeId) {
        newRoute = {}
    }
    return state.merge({fetching: false, error: null, routes, newRoute})
}
export const deleteRouteFailure = (state) => state.merge({fetching: false, error: true})

//Get Specific Route
export const getSpecificRoute = (state) => state.merge({fetchingTasks: true})
export const getSpecificRouteSuccess = (state, {route}) => state.merge({fetchingTasks: false, error: null, route})
export const getSpecificRouteFailure = (state) => state.merge({fetchingTasks: false, error: true})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_ROUTE]: createRoute,
    [Types.CREATE_ROUTE_SUCCESS]: createRouteSuccess,
    [Types.CREATE_ROUTE_FAILURE]: createRouteFailure,

    [Types.GET_ROUTES]: getRoutes,
    [Types.GET_ROUTES_SUCCESS]: getRoutesSuccess,
    [Types.GET_ROUTES_FAILURE]: getRoutesFailure,

    [Types.GET_ACTIVE_ROUTE]: getActiveRoute,
    [Types.GET_ACTIVE_ROUTE_SUCCESS]: getActiveRouteSuccess,
    [Types.GET_ACTIVE_ROUTE_FAILURE]: getActiveRouteFailure,

    [Types.UPDATE_ROUTE_STATUS]: updateRouteStatus,
    [Types.UPDATE_ROUTE_STATUS_SUCCESS]: updateRouteStatusSuccess,
    [Types.UPDATE_ROUTE_STATUS_FAILURE]: updateRouteStatusFailure,

    [Types.DELETE_ROUTE]: deleteRoute,
    [Types.DELETE_ROUTE_SUCCESS]: deleteRouteSuccess,
    [Types.DELETE_ROUTE_FAILURE]: deleteRouteFailure,


    [Types.GET_SPECIFIC_ROUTE]: getSpecificRoute,
    [Types.GET_SPECIFIC_ROUTE_SUCCESS]: getSpecificRouteSuccess,
    [Types.GET_SPECIFIC_ROUTE_FAILURE]: getSpecificRouteFailure,

    [Types.UPDATE_TASK_STATUS]: updateTaskStatus,
    [Types.UPDATE_TASK_STATUS_SUCCESS]: updateTaskStatusSuccess,
    [Types.UPDATE_TASK_STATUS_FAILURE]: updateTaskStatusFailure,

})
