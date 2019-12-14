import {call, put} from 'redux-saga/effects'
import FolderActions from '../Redux/FolderRedux'
import Api from '../Services/ApiCaller'
import {showErrorMessage} from "../Lib/Utilities";
import strings from "../Constants/strings";

export function * onGetFolders (api) {
  try {
    const {res} = yield call(Api.callServer, api.getFolders, {}, false)
    console.tron.warn({folderRes: res})
    yield put(FolderActions.getFoldersSuccess(res))
  } catch (e) {
    yield put(FolderActions.getFoldersFailure(e.message))
  }
}

//todo: test this code.
export function * onCreateFolder (api, {folder}) {
  try {
      if (!folder.name) {
          showErrorMessage(strings.folderNameMandatory);
          throw new Error('missing folder create params.')
      }
    const { res: { data } = {} } = yield call(Api.callServer, api.createFolder, folder, false)
    console.tron.warn({onCreateFoldersRes: data})
    yield put(FolderActions.createFolderSuccess(data))
  } catch (e) {
    yield put(FolderActions.createFolderFailure(e.message))
  }
}

export function * onUpdateFolder (api, {folder}) {
  try {
      if (!folder.id) {
          showErrorMessage(strings.folderIdNeededToUpdate);
          throw new Error('Invalid folder update params.')
      }
    const { res: { data = {} } } = yield call(Api.callServer, api.updateFolder, folder, false)
    console.tron.warn({onUpdateFoldersRes: data})
    yield put(FolderActions.updateFolderSuccess(data))
  } catch (e) {
    yield put(FolderActions.updateFolderFailure(e.message))
  }
}

export function * onDeleteFolder (api, { id }) {
  try {
      if (!id) {
          showErrorMessage(strings.folderIdNeededToUpdate);
          throw new Error('Invalid folder update params.')
      }
    const { res } = yield call(Api.callServer, api.deleteFolder, {id}, false)
    console.tron.warn({onDeleteFolder: res})
    yield put(FolderActions.deleteFolderSuccess(id))
  } catch (e) {
    yield put(FolderActions.deleteFolderFailure(e.message))
  }
}
