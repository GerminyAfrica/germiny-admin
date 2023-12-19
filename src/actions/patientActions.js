import axios from 'axios'
import { PATIENT_LIST_REQUEST, PATIENT_LIST_SUCCESS, PATIENT_LIST_FAIL, PATIENT_DELETE_REQUEST, PATIENT_DELETE_SUCCESS, PATIENT_DELETE_FAIL, PATIENT_DETAILS_REQUEST, PATIENT_DETAILS_SUCCESS, PATIENT_DETAILS_FAIL } from "../constants/patientConstants";

const url =  "https://germiny.dev" 
export const listPatients = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: PATIENT_LIST_REQUEST})

        const {userLogin: {userInfo, token}} = getState()
        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${url}/api/v1/admin/users`, config)
        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: PATIENT_LIST_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const deletePatient = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PATIENT_DELETE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`${url}/api/v1/admin/user/${id}`, config)
        dispatch({
            type: PATIENT_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: PATIENT_DELETE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const getPatientDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type:PATIENT_DETAILS_REQUEST
        })
        const {userLogin: {token}} = getState()

        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const {data} = await axios.get(`${url}/api/v1/admin/user/${id}`, config)
        dispatch({
            type: PATIENT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PATIENT_DETAILS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}