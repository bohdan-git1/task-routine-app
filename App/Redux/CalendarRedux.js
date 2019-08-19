import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {cloneDeep} from 'lodash'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    addNewTask: ['task', 'syncCalendar'],
    addNewTaskSuccess: ['task'],
    addNewTaskFailure: ['error'],

    getAllTasks: ['params'],
    getAllTasksSuccess: ['tasks'],
    getAllTasksFailure: ['error'],

    getTaskDetails: ['taskId'],
    getTaskDetailsSuccess: ['task'],
    getTaskDetailsFailure: ['error'],

    deleteTask: ['taskId'],
    deleteTaskSuccess: ['taskId'],
    deleteTaskFailure: ['error']
})

export const CalendarTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    fetching: false,
    task: {},
    tasks: []
})

/* ------------- Reducers ------------- */

// Add New Task
export const addNewTask = (state) => state.merge({fetching: true})
export const addNewTaskSuccess = (state, {task}) => {
    let tasks =Immutable.asMutable(state.tasks || [])
    tasks.unshift(task)
    return state.merge({fetching: false, error: null, tasks})
}
export const addNewTaskFailure = (state) => state.merge({fetching: false, error: true})

// Get All Tasks
export const getAllTasks = (state) => state.merge({fetching: true})
export const getAllTasksSuccess = (state, {tasks}) => state.merge({fetching: false, error: null, tasks})
export const getAllTasksFailure = (state) => state.merge({fetching: false, error: true})

// Get Task Details
export const getTaskDetails = (state) => state.merge({fetching: true})
export const getTaskDetailsSuccess = (state, {task}) => state.merge({fetching: false, error: null, task})
export const getTaskDetailsFailure = (state) => state.merge({fetching: false, error: true})

// Delete Task
export const deleteTask = (state) => state.merge({fetching: true})
export const deleteTaskSuccess = (state, {taskId}) => {
    let tasks = Immutable.asMutable(state.tasks || [])
    tasks = tasks.filter(({id}) => id !== taskId)
    return state.merge({fetching: false, error: null, tasks})
}
export const deleteTaskFailure = (state) => state.merge({fetching: false, error: true})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

    [Types.ADD_NEW_TASK]: addNewTask,
    [Types.ADD_NEW_TASK_SUCCESS]: addNewTaskSuccess,
    [Types.ADD_NEW_TASK_FAILURE]: addNewTaskFailure,

    [Types.GET_ALL_TASKS]: getAllTasks,
    [Types.GET_ALL_TASKS_SUCCESS]: getAllTasksSuccess,
    [Types.GET_ALL_TASKS_FAILURE]: getAllTasksFailure,

    [Types.GET_TASK_DETAILS]: getTaskDetails,
    [Types.GET_TASK_DETAILS_SUCCESS]: getTaskDetailsSuccess,
    [Types.GET_TASK_DETAILS_FAILURE]: getTaskDetailsFailure,

    [Types.DELETE_TASK]: deleteTask,
    [Types.DELETE_TASK_SUCCESS]: deleteTaskSuccess,
    [Types.DELETE_TASK_FAILURE]: deleteTaskFailure,


})
