import axios from 'axios'
import { EMAIL_CREATE_FAIL, EMAIL_CREATE_REQUEST, EMAIL_CREATE_SUCCESS, EMAIL_DELETE_FAIL, EMAIL_DELETE_REQUEST, EMAIL_DELETE_SUCCESS, 
        EMAIL_DETAILS_FAIL, EMAIL_DETAILS_REQUEST, EMAIL_DETAILS_SUCCESS, EMAIL_LIST_FAIL, EMAIL_LIST_REQUEST, EMAIL_LIST_SUCCESS, EMAIL_UPDATE_FAIL, EMAIL_UPDATE_REQUEST, EMAIL_UPDATE_SUCCESS } from '../constants/emailConstants'

const url =  "https://germiny.dev"       
export const listEmails = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: EMAIL_LIST_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/email`, config)
        dispatch({
            type: EMAIL_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: EMAIL_LIST_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const deleteEmail = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: EMAIL_DELETE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${url}/api/v1/admin/email/${id}`, config)
        dispatch({
            type: EMAIL_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: EMAIL_DELETE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const createEmail = (subject, message) => async (dispatch, getState) => {
    try {
        dispatch({type: EMAIL_CREATE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.post(`${url}/api/v1/admin/email`, {subject,message}, config)
        dispatch({
            type: EMAIL_CREATE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: EMAIL_CREATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const getEmailDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:EMAIL_DETAILS_REQUEST
        })
        const {userLogin: {token}} = getState()

        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const {data} = await axios.get(`${url}/api/v1/admin/email/${id}`, config)
        dispatch({
            type: EMAIL_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: EMAIL_DETAILS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const updateEmail = (id, subject, message) => async (dispatch, getState) => {
    try {
        dispatch({type: EMAIL_UPDATE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/email/${id}`, {subject, message}, config)
        dispatch({
            type: EMAIL_UPDATE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: EMAIL_UPDATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

