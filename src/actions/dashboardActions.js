import axios from 'axios'
import { ACTIVE_USERS_REQUEST,
        ACTIVE_USERS_SUCCESS,
        ACTIVE_USERS_FAIL,
        ONLINE_PRACT_REQUEST, 
        ONLINE_PRACT_SUCCESS, 
        ONLINE_PRACT_FAIL, 
        TOTAL_REQUESTS_REQUEST, 
        TOTAL_REQUESTS_SUCCESS, 
        TOTAL_REQUESTS_FAIL, 
        COMPLETED_JOBS_REQUEST, 
        COMPLETED_JOBS_SUCCESS, 
        COMPLETED_JOBS_FAIL } from '../constants/dashboardConstants'

const url =  "https://germiny.dev"
export const getActiveUsers = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: ACTIVE_USERS_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/activeUsers`, config)
        dispatch({
            type: ACTIVE_USERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ACTIVE_USERS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const getOnlinePractitioners = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: ONLINE_PRACT_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/onlinePractitioners`, config)
        dispatch({
            type: ONLINE_PRACT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ONLINE_PRACT_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const getTotalRequests = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: TOTAL_REQUESTS_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/requests`, config)
        dispatch({
            type: TOTAL_REQUESTS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: TOTAL_REQUESTS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const getCompletedJobs = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: COMPLETED_JOBS_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/completedJobs`, config)
        dispatch({
            type: COMPLETED_JOBS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: COMPLETED_JOBS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}