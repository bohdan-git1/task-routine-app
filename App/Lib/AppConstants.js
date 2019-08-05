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

export const APP_URL = 'http://18.191.149.64:3030/api/'

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

export const User_Roles = [
  {
    value: 'Admin',
  }, {
    value: 'Friend',
  }, {
    value: 'Minor',
  }
]

export const Budget_Types = [
  {
    value: 'Electricity',
  }, {
    value: 'Utility Bills',
  }, {
    value: 'Rents',
  },
  {
    value: 'Transportation',
  }
]

export const Priority_Types = [
  {
    id: 1,
    type: 'high',
    color: Colors.orange
  }, {
    id: 2,
    type: 'normal',
    color: Colors.yellow
  }, {
    id: 3,
    type: 'low',
    color: Colors.green
  }
]

// App Keys
// Debug 09:77:33:05:5B:54:D3:B3:90:75:DC:EC:4D:E9:64:BA:FA:1F:AB:00
// Release 9E:4A:65:D3:D0:4A:4F:EC:F2:37:99:19:32:48:D2:08:38:F0:53:C6

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


export const ASYNC_STORAGE_KEYS = {
    HAS_LOADED_BEFORE: 'HAS_LOADED_BEFORE'
}


export const PERMISSION_RESPONSES = {
    AUTHORIZED: 'authorized',
    DENIED: 'denied',
    RESTRICTED: 'restricted',
    UNDETERMINED: 'undetermined'
}

export const ADD_FAMILY_MEMBER_BUTTON_ID = 'addUserBtn'
