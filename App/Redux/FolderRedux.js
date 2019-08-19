import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getFolders: null,
    getFoldersSuccess: ['folders'],
    getFoldersFailure: ['error']

})

export const FolderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    folders: [],
    hasNoMore: false
})

/* ------------- Reducers ------------- */

// getFoldersReq
export const getFoldersReq = (state) => state.merge({fetching: true})
export const getFoldersSuccess = (state, { folders }) => {
    const { items, total, pageNo, pageSize, totalRecords } = folders
    let hasNoMore = true
    if (totalRecords > pageNo * pageSize) {
        hasNoMore = false
    }
    return state.merge({fetching: false, error: null, folders: items, hasNoMore})
}
export const getFoldersFailure = (state) => state.merge({fetching: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    // getConfig
    [Types.GET_FOLDERS]: getFoldersReq,
    [Types.GET_FOLDERS_SUCCESS]: getFoldersSuccess,
    [Types.GET_FOLDERS_FAILURE]: getFoldersFailure

})
