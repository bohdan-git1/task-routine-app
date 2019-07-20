import {Colors} from "../Themes";

export const imageOptions = {
  mediaType: 'photo',
  cropping: true,
  compressImageMaxWidth: 800,
  compressImageMaxHeight: 800,
  compressImageQuality: 0.9
}
export const photosPermissionTypes = {
  CAMERA: 'camera',
  PHOTOS: 'photo'
}

export const APP_URL = 'http://192.168.8.103:3030/api/'

export const CloudinaryCred  = {
  "apiKey": "713915523318189",
  "name": "couponcloud",
  "secret": "DEIPiuZsj9xR02lSNHYNWgDWOxw"
}

export const Activity_category = [{
  value: 'Category 1',
}, {
  value: 'Category 2',
}, {
  value: 'Category 3',
}];

export const Priority_Types = [
  {
    id: 1,
    color: Colors.orange
  }, {
    id: 2,
    color: Colors.yellow
  }, {
    id: 3,
    color: Colors.green
  }
]

export const Folders = [
    'Random Stuff',
    'Activities',
    'Errands',
    'Tasks'
]

export const ActivityActions = [
  {
    id: 1,
    title: 'DELETE',
    color: Colors.orange
  },
  {
    id: 2,
    title: 'CANCEL',
    color: Colors.yellow
  },
  {
    id: 3,
    title: 'CREATE ROUTE',
    color: Colors.green
  }
]
