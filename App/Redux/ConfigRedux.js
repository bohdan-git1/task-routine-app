import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getConfig: null,
  getConfigSuccess: ['config'],
  getConfigFailure: ['error']
})

export const ConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  config: undefined
})

/* ------------- Reducers ------------- */

// getConfigReq
export const getConfigReq = (state) => state.merge({fetching: true})
// success getConfig
export const getConfigSuccess = (state, {config}) => state.merge({fetching: false, error: null, config})
// failure getConfig
export const getConfigFailure = (state) => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

  // getConfig
  [Types.GET_CONFIG]: getConfigReq,
  [Types.GET_CONFIG_SUCCESS]: getConfigSuccess,
  [Types.GET_CONFIG_FAILURE]: getConfigFailure

})

export const selectConfig = (state) => state.config
