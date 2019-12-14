import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getFolders: null,
    getFoldersSuccess: ['folders'],
    getFoldersFailure: ['error'],

    createFolder: ['folder'],
    createFolderSuccess: ['folder'],
    createFolderFailure: ['error'],

    updateFolder: ['folder'],
    updateFolderSuccess: ['folder'],
    updateFolderFailure: ['error'],

    deleteFolder: ['id'],
    deleteFolderSuccess: ['id'],
    deleteFolderFailure: ['error']

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

// createFolderReq
export const createFolderReq = (state) => state.merge({fetching: true})
export const createFolderSuccess = (state, { folder }) =>
    state.merge({fetching: false, error: null, folders: [...state.folders, folder]})
export const createFolderFailure = (state) => state.merge({fetching: false, error: true})

// DELETE_FOLDER
export const deleteFolderReq = (state) => state.merge({fetching: true})
export const deleteFolderSuccess = (state, { id }) => {
    console.tron.warn({beforeDelFOlder: state.folders})
    const folders = (state.folders || []).filter(item => item.id !== id)
    console.tron.warn({afterDelFolder: folders})
    return state.merge({
        fetching: false,
        error: null,
        folders
    })
}
export const deleteFolderFailure = (state) => state.merge({fetching: false, error: true})

// updateFolderReq
export const updateFolderReq = (state) => state.merge({fetching: true})
export const updateFolderSuccess = (state, { folder }) => {
    const { id } = folder
    if (!id) {
        return state
    }
    const newFolders = (state.folders || []).map(item => {
        if (item.id === id){
            return {
                ...item, ...folder
            }
        }
        return item
    })
    return state.merge({fetching: false, error: null, folders: newFolders})
}
export const updateFolderFailure = (state) => state.merge({fetching: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    // getConfig
    [Types.GET_FOLDERS]: getFoldersReq,
    [Types.GET_FOLDERS_SUCCESS]: getFoldersSuccess,
    [Types.GET_FOLDERS_FAILURE]: getFoldersFailure,

    // createFolder
    [Types.CREATE_FOLDER]: createFolderReq,
    [Types.CREATE_FOLDER_SUCCESS]: createFolderSuccess,
    [Types.CREATE_FOLDER_FAILURE]: createFolderFailure,

    // updateFolder
    [Types.UPDATE_FOLDER]: updateFolderReq,
    [Types.UPDATE_FOLDER_SUCCESS]: updateFolderSuccess,
    [Types.UPDATE_FOLDER_FAILURE]: updateFolderFailure,

    // deleteFolder
    [Types.DELETE_FOLDER]: deleteFolderReq,
    [Types.DELETE_FOLDER_SUCCESS]: deleteFolderSuccess,
    [Types.DELETE_FOLDER_FAILURE]: deleteFolderFailure

})
