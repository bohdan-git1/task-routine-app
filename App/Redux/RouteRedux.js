import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    createRoute: ['route'],
    createRouteSuccess: ['route'],
    createRouteFailure: ['error'],

    getRoutes: ['params'],
    getRoutesSuccess: ['routes'],
    getRoutesFailure: ['error']
})

export const RouteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    routes: [],
    route: {}
})

/* ------------- Reducers ------------- */

// Create New Route
export const createRoute = (state) => state.merge({fetching: true})
export const createRouteSuccess = (state, {route}) => state.merge({fetching: false, error: null, route})
export const createRouteFailure = (state) => state.merge({fetching: false, error: true})

// Get Routes
export const getRoutes = (state) => state.merge({fetching: true})
export const getRoutesSuccess = (state, {routes}) => state.merge({fetching: false, error: null, routes})
export const getRoutesFailure = (state) => state.merge({fetching: false, error: true})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_ROUTE]: createRoute,
    [Types.CREATE_ROUTE_SUCCESS]: createRouteSuccess,
    [Types.CREATE_ROUTE_FAILURE]: createRouteFailure,

    [Types.GET_ROUTES]: getRoutes,
    [Types.GET_ROUTES_SUCCESS]: getRoutesSuccess,
    [Types.GET_ROUTES_FAILURE]: getRoutesFailure,

})
