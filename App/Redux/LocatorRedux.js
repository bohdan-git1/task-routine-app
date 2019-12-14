import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getAllLocations: ['params'],
    getAllLocationsSuccess: ['locations'],
    getAllLocationsFailure: ['error'],

    addLocation: ['params'],
    addLocationSuccess: ['location'],
    addLocationFailure: ['error'],

})

export const LocatorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    locations: [],
    location: {},
})

/* ------------- Reducers ------------- */

// Get All Locations
export const getAllLocations = (state) => state.merge({fetching: true})
export const getAllLocationsSuccess = (state, {locations}) => state.merge({fetching: false, error: null, locations})
export const getAllLocationsFailure = (state) => state.merge({fetching: false, error: true})

// Add Location
export const addLocation = (state) => state.merge({fetching: true, success: false})
export const addLocationSuccess = (state, {location}) => {
    let locations = Immutable.asMutable(state.locations || [])
    locations.unshift(location)
    return state.merge({fetching: false, error: null, location, locations, success: true})
}
export const addLocationFailure = (state) => state.merge({fetching: false, error: true, success: false})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    [Types.GET_ALL_LOCATIONS]: getAllLocations,
    [Types.GET_ALL_LOCATIONS_SUCCESS]: getAllLocationsSuccess,
    [Types.GET_ALL_LOCATIONS_FAILURE]: getAllLocationsFailure,

    [Types.ADD_LOCATION]: addLocation,
    [Types.ADD_LOCATION_SUCCESS]: addLocationSuccess,
    [Types.ADD_LOCATION_FAILURE]: addLocationFailure,

})
