import axios from 'axios'
import { PRACT_LIST_REQUEST, PRACT_LIST_SUCCESS, PRACT_LIST_FAIL, PRACT_DELETE_REQUEST, PRACT_DELETE_SUCCESS, PRACT_DELETE_FAIL, 
    PRACT_DETAILS_REQUEST, PRACT_DETAILS_SUCCESS, PRACT_DETAILS_FAIL, PRACT_VERIFY_REQUEST, PRACT_VERIFY_SUCCESS, PRACT_VERIFY_FAIL, 
    PRACT_DEACTIVATE_REQUEST, PRACT_DEACTIVATE_SUCCESS, PRACT_DEACTIVATE_FAIL, PRACT_ACTIVATE_REQUEST, PRACT_ACTIVATE_SUCCESS, 
    PRACT_ACTIVATE_FAIL, PRACT_INVITE_SUCCESS, PRACT_INVITE_REQUEST, PRACT_INVITE_FAIL, PRACT_DECLINE_REQUEST, PRACT_DECLINE_SUCCESS, 
    PRACT_DECLINE_FAIL, PRACT_REJECT_REQUEST, PRACT_REJECT_SUCCESS, PRACT_REJECT_FAIL, PRACT_EMAIL_REQUEST, PRACT_EMAIL_SUCCESS, PRACT_EMAIL_FAIL } from "../constants/practitionerConstants";

const url =  "https://germiny.dev"
export const listPractitioners = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: PRACT_LIST_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/practitioners`, config)
        dispatch({
            type: PRACT_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: PRACT_LIST_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const deletePractitioner = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_DELETE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${url}/api/v1/admin/practitioner/${id}`, config)
        dispatch({
            type: PRACT_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: PRACT_DELETE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const getPractitionerDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:PRACT_DETAILS_REQUEST
        })
        const {userLogin: {token}} = getState()

        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const {data} = await axios.get(`${url}/api/v1/admin/practitioner/${id}`, config)
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRACT_DETAILS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const verifyPractitioner = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_VERIFY_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/verify/${id}`, {}, config)
        dispatch({
            type: PRACT_VERIFY_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_VERIFY_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const deactivatePractitioner = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_DEACTIVATE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/deactivate/${id}`, {}, config)

        dispatch({
            type: PRACT_DEACTIVATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_DEACTIVATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const activatePractitioner = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_ACTIVATE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/activate/${id}`, {}, config)

        dispatch({
            type: PRACT_ACTIVATE_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_ACTIVATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const invitePractitioner = (id, venue, date, time) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_INVITE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/invite/${id}`, {venue, date, time}, config)

        dispatch({
            type: PRACT_INVITE_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_INVITE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const declinePractitioner = (id, reason) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_DECLINE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/decline/${id}`, {reason}, config)

        dispatch({
            type: PRACT_DECLINE_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_DECLINE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const rejectPractitioner = (id, reason) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_REJECT_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.put(`${url}/api/v1/admin/practitioner/reject/${id}`, {reason}, config)

        dispatch({
            type: PRACT_REJECT_SUCCESS,
            payload:data
        })
        dispatch({
            type: PRACT_DETAILS_SUCCESS,
            payload:data.data
        })

    } catch (error) {
        dispatch({
            type: PRACT_REJECT_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const emailPractitioner = (subject, emails, message) => async (dispatch, getState) => {
    try {
        dispatch({type: PRACT_EMAIL_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.post(`${url}/api/v1/admin/practitioner/sendEmail`, {subject, emails, message}, config)

        dispatch({
            type: PRACT_EMAIL_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: PRACT_EMAIL_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}