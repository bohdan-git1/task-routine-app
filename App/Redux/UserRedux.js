import {createActions, createReducer} from 'reduxsauce'
import * as _ from 'lodash'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    signUp: ['info'],
    signUpSuccess: ['user'],
    signUpFailure: ['error'],

    login: ['info'],
    loginSuccess: ['user'],
    loginFailure: ['error'],

    verifyPin: ['info'],
    verifyPinSuccess: ['user'],
    verifyPinFailure: ['error'],

    resendPin: ['info'],
    resendPinSuccess: ['user'],
    resendPinFailure: ['error'],

    addProfile: ['userId', 'info', 'isSignup'],
    addProfileSuccess: ['user', 'isSignup'],
    addProfileFailure: ['error'],
    updateIsSignUp: ['isSignup'],

    editProfile: ['userId', 'info'],
    editProfileSuccess: ['user'],
    editProfileFailure: ['error'],

    getCurrentLocation: null,
    getCurrentLocationSuccess: ['currentLocation'],
    getCurrentLocationFailure: ['error'],

    logout: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    currentLocation: {},
    fetchingLocation: false,
    user: {},
    isSignup: false
})

/* ------------- Reducers ------------- */

// SingUp
export const signUpRequest = (state) => state.merge({fetching: true})
export const signUpSuccess = (state, {user}) => state.merge({fetching: false, error: null, user})
export const signUpFailure = (state) => state.merge({fetching: false, error: true})

// Login
export const loginRequest = (state) => state.merge({fetching: true})
export const loginSuccess = (state, {user}) => {
    const { user: stateUser = {} } = state
    let newUser = user
    if (!_.isEmpty(stateUser) && stateUser.id === user.id) {
        newUser.familyId = (newUser.familyId || stateUser.familyId)
    }
    return state.merge({fetching: false, error: null, user: newUser})
}
export const loginFailure = (state) => state.merge({fetching: false, error: true})

// Verify PIN
export const verifyPinRequest = (state) => state.merge({fetching: true})
export const verifyPinSuccess = (state, {user}) => state.merge({fetching: false, error: null, user})
export const verifyPinFailure = (state) => state.merge({fetching: false, error: true})

// Resend PIN
export const resendPinRequest = (state) => state.merge({fetching: true})
export const resendPinSuccess = (state, {user}) => state.merge({fetching: false, error: null, user})
export const resendPinFailure = (state) => state.merge({fetching: false, error: true})

// Add Profile
export const addProfileRequest = (state) => state.merge({fetching: true})
export const addProfileSuccess = (state, { user, isSignup }) => state.merge({fetching: false, error: null, user, isSignup})
export const addProfileFailure = (state) => state.merge({fetching: false, error: true})
export const updateIsSignup = (state, { isSignup }) => state.merge({ isSignup })

// Edit Profile
export const editProfileRequest = (state) => state.merge({fetching: true})
export const editProfileSuccess = (state, { user }) => state.merge({fetching: false, error: null, user})
export const editProfileFailure = (state) => state.merge({fetching: false, error: true})

// get Current Location
export const getCurrentLocationReq = (state) => state.merge({fetchingLocation: true, error: null})
export const getCurrentLocationSuccess = (state, {currentLocation}) => (
    state.merge({fetchingLocation: false, error: null, currentLocation})
)
export const getCurrentLocationFailure = (state, {error}) => (
    state.merge({fetchingLocation: false, error})
)

export const logoutUser = (state) => {
    return state.merge({...INITIAL_STATE})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    [Types.SIGN_UP]: signUpRequest,
    [Types.SIGN_UP_SUCCESS]: signUpSuccess,
    [Types.SIGN_UP_FAILURE]: signUpFailure,

    [Types.LOGIN]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_FAILURE]: loginFailure,

    [Types.VERIFY_PIN]: verifyPinRequest,
    [Types.VERIFY_PIN_SUCCESS]: verifyPinSuccess,
    [Types.VERIFY_PIN_FAILURE]: verifyPinFailure,

    [Types.RESEND_PIN]: resendPinRequest,
    [Types.RESEND_PIN_SUCCESS]: resendPinSuccess,
    [Types.RESEND_PIN_FAILURE]: resendPinFailure,

    [Types.ADD_PROFILE]: addProfileRequest,
    [Types.ADD_PROFILE_SUCCESS]: addProfileSuccess,
    [Types.ADD_PROFILE_FAILURE]: addProfileFailure,

    [Types.EDIT_PROFILE]: editProfileRequest,
    [Types.EDIT_PROFILE_SUCCESS]: editProfileSuccess,
    [Types.EDIT_PROFILE_FAILURE]: editProfileFailure,

    [Types.GET_CURRENT_LOCATION]: getCurrentLocationReq,
    [Types.GET_CURRENT_LOCATION_SUCCESS]: getCurrentLocationSuccess,
    [Types.GET_CURRENT_LOCATION_FAILURE]: getCurrentLocationFailure,

    [Types.UPDATE_IS_SIGN_UP]: updateIsSignup,

    [Types.LOGOUT]: logoutUser


})

export const selectUser = (state) => state.user
