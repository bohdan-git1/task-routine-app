// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import {APP_URL} from "../Lib/AppConstants";

// our "constructor"
const create = (baseURL = `${APP_URL}api/`) => {
    // ------
    // STEP 1
    // ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache'
        },
        // 10 second timeout...
        timeout: 10000
    })

    // ------
    // STEP 2
    // ------
    //
    // Define some functions that call the api.  The goal is to provide
    // a thin wrapper of the api layer providing nicer feeling functions
    // rather than "get", "post" and friends.
    //
    // I generally don't like wrapping the output at this level because
    // sometimes specific actions need to be take on `403` or `401`, etc.
    //
    // Since we can't hide from that, we embrace it by getting out of the
    // way at this level.
    //
    const signUpUser = (info) => api.post('users/signup', info)
    const signIn= (info) => api.post('users/signin', info)
    const verifyPinCode = (info) => api.post('users/verify', info)
    const resendPinCode = (info) => api.post('users/resend', info)
    const addProfile = (info, userId) => api.post(`users/addprofile/${userId}`, info)
    const editProfile = (info, userId) => api.put(`users/${userId}`, info)

    // Calendar
    const addNewTask = (task) => api.post('tasks', task)
    const getAllTasks = (params) => api.get('tasks', params)
    const getTaskDetails = (taskId) => api.get(`tasks/${taskId}`)
    const deleteTask = (taskId) => api.delete(`tasks/${taskId}`)

    const updateTaskStatus = (params, taskId) => api.post(`tasks/updateStatus/${taskId}`, params)

    // family
    const createFamily = (data) => api.post('families', data)
    const fetchFamily = ({ familyId }) => api.get(`families/${familyId}`)
    const getFamilyPermissions = () => api.get(`userpermissions`)
    const changeFamilyPermission = (permissions, familyId) => api.put(`userpermissions/${familyId}`, permissions)

    //folders
    const getFolders = () => api.get('folders')

    //Route
    const createRoute = (route) => api.post('routes', route)
    const getRoutes = (data) => api.get('routes', data)
    const updateRouteStatus = (params, routeId) => api.post(`routes/updateStatus/${routeId}`, params)
    const deleteRoute = (routeId) => api.delete(`routes/${routeId}`)
    const getSpecificRoute = (routeId) => api.get(`routes/${routeId}`)

    // ------
    // STEP 3
    // ------
    //
    // Return back a collection of functions that we would consider our
    // interface.  Most of the time it'll be just the list of all the
    // methods in step 2.
    //
    // Notice we're not returning back the `api` created in step 1?  That's
    // because it is scoped privately.  This is one way to create truly
    // private scoped goodies in JavaScript.
    //
    return {
        // a list of the API functions from step 2
        ...api,
        signUpUser,
        signIn,
        verifyPinCode,
        resendPinCode,
        addProfile,
        editProfile,
        addNewTask,
        getAllTasks,
        getTaskDetails,
        deleteTask,

        createFamily,
        fetchFamily,
        getFamilyPermissions,
        changeFamilyPermission,

        getFolders,

        createRoute,
        getRoutes,
        updateRouteStatus,
        deleteRoute,
        getSpecificRoute,
        updateTaskStatus
    }
}

// let's return back our create method as the default.
export default {
    create
}
