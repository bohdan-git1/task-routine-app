import {call, put} from 'redux-saga/effects'
import CalendarActions from '../Redux/CalendarRedux'
import Api from '../Services/ApiCaller'
import {Actions} from "react-native-router-flux";
import {showMessage} from "../Lib/Utilities";
import RNCalendarEvents from "react-native-calendar-events";

export function* onAddNewTask(api, {task, syncCalendar}) {
    try {
        const {res} = yield call(Api.callServer, api.addNewTask, task, true)
        const {isSuccess, error, data} = res || {}
        if (res && isSuccess) {
            yield put(CalendarActions.addNewTaskSuccess(res.data))
            if (syncCalendar) {
                const {name = '', date: startDate = '', locationName: location = '', toTime: endDate = ''} = data || {}
                RNCalendarEvents.saveEvent(name, {startDate, location, endDate}).then((res) => {
                    console.tron.warn(res)
                }).catch((error) => {
                    console.tron.warn(error)
                })
            }
            showMessage('New task added successfully')
            Actions.pop()
        } else {
            if (error && typeof error === "string") {
                showMessage(error)
            }
            yield put(CalendarActions.addNewTaskFailure(e.message))
        }
    } catch (e) {
        yield put(CalendarActions.addNewTaskFailure(e.message))
    }
}

export function* onGetAllTasks(api, {params = {}}) {
    try {
        const {res} = yield call(Api.callServer, api.getAllTasks, params, true)
        if (res && res.isSuccess) {
            yield put(CalendarActions.getAllTasksSuccess(res.items))
        }
    } catch (e) {
        yield put(CalendarActions.getAllTasksFailure(e.message))
    }
}

export function* onGetTaskDetails(api, {taskId}) {
    try {
        const {res} = yield call(Api.callServer, api.getTaskDetails, taskId, true)
        if (res && res.isSuccess) {
            yield put(CalendarActions.getTaskDetailsSuccess(res.data))
        }
    } catch (e) {
        yield put(CalendarActions.getTaskDetailsFailure(e.message))
    }
}

export function* onDeleteTask(api, {taskId}) {
    try {
        const {res} = yield call(Api.callServer, api.deleteTask, taskId, true)
        if (res && res.isSuccess) {
            yield put(CalendarActions.deleteTaskSuccess(taskId))
            showMessage('Task deleted successfully')
            Actions.pop()
        }
    } catch (e) {
        yield put(CalendarActions.deleteTaskFailure(e.message))
    }
}