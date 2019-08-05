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

})

export const FamilyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    family: {}
})

/* ------------- Reducers ------------- */

// createFamily
export const createFamilyReq = (state) => state.merge({fetching: true})
export const createFamilySuccess = (state, { family }) => state.merge({fetching: false, error: null, family})
export const createFamilyFailure = (state) => state.merge({fetching: false, error: true})

// fetchFamily
export const fetchFamilyReq = (state, {familyId}) => {
    console.tron.warn('familyReq: ' + String(familyId === state.family.id))
    const family = familyId === state.family.id ? state.family : {}
    return state.merge({ fetching: true, family })
}
export const fetchFamilySuccess = (state, { family }) => state.merge({ fetching: false, error: null, family })
export const fetchFamilyFailure = (state) => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CREATE_FAMILY]: createFamilyReq,
    [Types.CREATE_FAMILY_SUCCESS]: createFamilySuccess,
    [Types.CREATE_FAMILY_FAILURE]: createFamilyFailure,

    [Types.FETCH_FAMILY]: fetchFamilyReq,
    [Types.FETCH_FAMILY_SUCCESS]: fetchFamilySuccess,
    [Types.FETCH_FAMILY_FAILURE]: fetchFamilyFailure
})
