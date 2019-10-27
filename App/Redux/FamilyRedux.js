import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    createFamily: ['name', 'invites'],
    createFamilySuccess: ['family'],
    createFamilyFailure: ['error'],

    fetchFamily: ['familyId'],
    fetchFamilySuccess: ['family'],
    fetchFamilyFailure: null,

    getFamilyPermissions: null,
    getFamilyPermissionsSuccess: ['permissions'],
    getFamilyPermissionsFailure: ['error'],

    changeFamilyPermissions: ['familyId', 'permissions'],
    changeFamilyPermissionsSuccess: ['family'],
    changeFamilyPermissionsFailure: null,

})

export const FamilyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    family: {},
    permissions: []
})

/* ------------- Reducers ------------- */

// createFamily
export const createFamilyReq = (state) => state.merge({fetching: true})
export const createFamilySuccess = (state, { family }) => state.merge({fetching: false, error: null, family})
export const createFamilyFailure = (state) => state.merge({fetching: false, error: true})

// fetchFamily
export const fetchFamilyReq = (state, {familyId}) => {
    const family = familyId === state.family.id ? state.family : {}
    return state.merge({ fetching: true, family })
}
export const fetchFamilySuccess = (state, { family }) => state.merge({ fetching: false, error: null, family })
export const fetchFamilyFailure = (state) => state.merge({ fetching: false, error: true })


// Get Family Permissions
export const getFamilyPermissionsReq = (state) => {
    return state.merge({ fetching: true })
}
export const getFamilyPermissionsSuccess = (state, { permissions }) => state.merge({ fetching: false, error: null, permissions })
export const getFamilyPermissionsFailure = (state) => state.merge({ fetching: false, error: true })

// Change Family Permissions
export const changeFamilyPermissionsReq = (state) => {
    return state.merge({ fetching: true })
}
export const changeFamilyPermissionsSuccess = (state, { familyPermission }) => state.merge({ fetching: false, error: null })
export const changeFamilyPermissionsFailure = (state) => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_FAMILY]: createFamilyReq,
    [Types.CREATE_FAMILY_SUCCESS]: createFamilySuccess,
    [Types.CREATE_FAMILY_FAILURE]: createFamilyFailure,

    [Types.FETCH_FAMILY]: fetchFamilyReq,
    [Types.FETCH_FAMILY_SUCCESS]: fetchFamilySuccess,
    [Types.FETCH_FAMILY_FAILURE]: fetchFamilyFailure,

    [Types.GET_FAMILY_PERMISSIONS]: getFamilyPermissionsReq,
    [Types.GET_FAMILY_PERMISSIONS_SUCCESS]: getFamilyPermissionsSuccess,
    [Types.GET_FAMILY_PERMISSIONS_FAILURE]: getFamilyPermissionsFailure,

    [Types.CHANGE_FAMILY_PERMISSIONS]: changeFamilyPermissionsReq,
    [Types.CHANGE_FAMILY_PERMISSIONS_SUCCESS]: changeFamilyPermissionsSuccess,
    [Types.CHANGE_FAMILY_PERMISSIONS_FAILURE]: changeFamilyPermissionsFailure,
})
