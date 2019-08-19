import {call, put} from 'redux-saga/effects'
import FolderActions from '../Redux/FolderRedux'
import Api from '../Services/ApiCaller'

export function * onGetFolders (api) {
  try {
    const {res} = yield call(Api.callServer, api.getFolders, {}, false)
    console.tron.warn({folderRes: res})
    yield put(FolderActions.getFoldersSuccess(res))
  } catch (e) {
    yield put(FolderActions.getFoldersFailure(e.message))
  }
}
