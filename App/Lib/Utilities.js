import {Alert, NetInfo} from 'react-native'
import {Colors, Images} from '../Themes/'
import Snackbar from 'react-native-snackbar'
import Permissions from 'react-native-permissions'
import {isEqual, compact, isEmpty, unionBy} from 'lodash'
import {photosPermissionTypes} from "./AppConstants";
import moment from 'moment'
import OpenSettings from 'react-native-open-settings'
import RNCalendarEvents from "react-native-calendar-events";
import Geolocation from "react-native-geolocation-service";
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
import RNGooglePlaces from "react-native-google-places";

let connectedCallbacks = []
export const registerConnectionChangeCB = (Callback) => {
    if (typeof Callback === 'function') {
        connectedCallbacks = unionBy(connectedCallbacks, [Callback])
    }
}
export const unRegisterConnectCb = (Callback) => {
    if (typeof Callback === 'function') {
        connectedCallbacks = connectedCallbacks.filter(item => !isEqual(item, Callback))
    }
}
export let isConnected = false

const updateConnected = ({type}) => {
    isConnected = (type !== 'NONE' && type !== 'none')
    for (const Cb of connectedCallbacks) {
        Cb(isConnected)
    }
    /* console.tron.log('Network Connection = ' + isConnected)
     console.log('Network Connection = ' + isConnected)*/
}

export const checkConnected = () => {
    NetInfo.getConnectionInfo().then(updateConnected)
    NetInfo.addEventListener('connectionChange', updateConnected)
}

// Correct Map URIs
export const showMessage = (message: string) => {
    Snackbar.show({
        title: message,
        duration: Snackbar.LENGTH_LONG,
        action: {
            title: 'OK',
            color: Colors.snow,
            onPress: () => {
            }
        }
    })
}

export const handlePermissionError = (permissionType) => {
    Permissions.check(permissionType)
        .then(response => {
            if (response === 'denied' || response === 'restricted' || response === 'undetermined') {
                const title = isEqual(photosPermissionTypes.CAMERA, permissionType) ? I18n.t('cameraPermissionTitle') : I18n.t('photosPermissionTitle')
                const message = isEqual(photosPermissionTypes.CAMERA, permissionType) ? I18n.t('cameraPermissionMessage') : I18n.t('photosPermissionMessage')
                Alert.alert(title, message,
                    [{text: 'Cancel', style: 'cancel'}, {
                        text: 'Settings',
                        onPress: () => OpenSettings.openSettings()
                    }])
            }
        })
}


export const showErrorMessage = (error: any) => {
    if (typeof error === 'string' || error instanceof String) {
        showMessage(error)
    } else if (error && error.message) {
        showMessage(error.message)
    } else {
        showMessage('Something went wrong please try again')
    }
}

export const isValidEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

export const isValidPassword = (password: string) => {
    var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    return re.test(password)
}

export const isValidPhoneNo = (phoneNo: string) => {
    var phoneRe = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    return phoneRe.test(phoneNo)
}

export const setScheme = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url
    }
    return url
}

export const getAddressString = (city, state, zipCode) => {
    return compact([city, state, zipCode]).join(', ')
}

export const formatAddress = (street1, street2, city, state, zipCode) => {
    return compact([street1, street2, city, state, zipCode]).join(', ')
}

export const showAlertDialog = (title, message, okCallBack, cancelable = false) => {
    Alert.alert(
        title,
        message,
        [
            {text: 'OK', onPress: okCallBack}
        ],
        {cancelable}
    )
}

export const FormatDateTime = (date, format) => {
    return moment(date).format(format)
}

export const showSettingsDialog = (
    title = 'Location Permission',
    message = 'Allow Ziloo to access this device\'s location?',
    onCancel = () => {
    }) => {
    Alert.alert(title, message,
        [{text: 'Cancel', style: 'cancel', onPress: onCancel},
            {text: 'Settings', onPress: () => OpenSettings.openSettings()}
        ])
}

export const convertDataTasks = (data = []) => {
    let sections = {}
    data.forEach((item, index) => {
        let itemDate = moment(item.date).isValid() ? moment(item.date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
        if (sections[itemDate]) {
            sections[itemDate].push(item)
        } else {
            sections[itemDate] = [item]
        }
    })
    return sections
}


const formatEvent = async (options) => {
    const start = moment(options.startDate)
    const end = start.add(toInteger(options.duration), 'minutes').format()
    const location = toString(' ', [
        options.streetAddress,
        toString(', ', [options.city, options.state, options.zip])
    ])

    const calendars =
        await RNCalendarEvents.findCalendars().catch(err => console.log(err))
    const primaryCalendar =
        calendars.find(c => c.isPrimary && c.allowsModifications)

    if (!primaryCalendar) {
        return null
    }

    return ({
        id: options.eventId || undefined,
        calendarId: primaryCalendar.id,
        location,
        notes: options.notes,
        startDate: moment(options.startDate, 'YYYY-MM-DD HH:mm:ss').toISOString(),
        endDate: end.toISOString()
    })
}

export const createEvent = options => {
    return new Promise(resolve =>
        validateAuth(
            () => RNCalendarEvents
                .saveEvent(options.title, formatEvent(options))
                .then((id) => {
                    resolve({data: {calendarEventId: id}})
                }),
            status => resolve({error: true, data: {message: status}})
        )
    )
}

export const requestPermissions = (permissionType) => new Promise((resolve, reject) => {
    try {
        Permissions.request(permissionType)
            .then(res => resolve(res))

    } catch (e) {
        console.tron.warn('error: ' + e.message)
        reject(e)
    }
})

export const getCurrentGPSLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                const {coords: {latitude, longitude} = {}} = position
                resolve({latitude, longitude})
            },
            (error) => reject(error),
            {enableHighAccuracy: true, timeout: 5000}
        )
    })
}

export const getGPSEnabled = () => {
    if (Platform.OS === 'android') {
        return LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: '<h4>Enable Location Service</h4>This app wants to access your device location.<br/>',
            ok: 'YES',
            cancel: 'NO',
            enableHighAccuracy: false,
            showDialog: true,
            openLocationServices: true
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
    return Promise.resolve({ios: true})
}

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        RNGooglePlaces.getCurrentPlace()
            .then((results) => {
                const sortedResults = results.sort((a, b) => {
                    return (a.likelihood > b.likelihood) ? -1 : ((b.likelihood > a.likelihood) ? 1 : 0)
                })
                resolve(sortedResults[0])
            })
            .catch((error) => {
                reject(error)
            });
    })
}

export const TASK_STATUSES = {
    COMPLETED: 'completed',
    INCOMPLETE: 'uncompleted'
}

export const getLatLonDiffInMeters = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // distance in km
    return d * 1000;
}

export const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}

export const ARRIVED_DISTANCE_THRESHOLD = 10; //in meters

// Route & Tasks Specific Utils
export const routeHasIncompleteTask = (route) => {
    const { tasks = [] } = route
    if (!Array.isArray(tasks) || !tasks.length) {
        return false
    }
    for (let task of tasks) {
        const { task: { taskStatus = ''} = {} } = task
        if (taskStatus === TASK_STATUSES.INCOMPLETE) {
            return true
        }
    }
    return false
}

export const routeHasTasks = (route) => {
    const { tasks = [] } = route
    return Array.isArray(tasks) || tasks.length
}
