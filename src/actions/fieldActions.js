import axios from 'axios'
import { FIELD_CREATE_FAIL, FIELD_CREATE_REQUEST, FIELD_CREATE_SUCCESS, FIELD_DELETE_FAIL, FIELD_DELETE_REQUEST, FIELD_DELETE_SUCCESS, FIELD_LIST_FAIL, FIELD_LIST_REQUEST, FIELD_LIST_SUCCESS } from '../constants/fieldConstants'

export const listFields = () => async (dispatch, getState) =>  {
    try {
        dispatch({type: FIELD_LIST_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/v1/admin/fields/all`, config)
        dispatch({
            type: FIELD_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: FIELD_LIST_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const deleteField = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: FIELD_DELETE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`/api/v1/admin/field/${id}`, config)
        dispatch({
            type: FIELD_DELETE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: FIELD_DELETE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

export const createField = (name, displayName, practclass) => async (dispatch, getState) => {
    try {
        dispatch({type: FIELD_CREATE_REQUEST})

        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const { data } = await axios.post(`/api/v1/admin/field/`, {name, displayName, practclass}, config)
        dispatch({
            type: FIELD_CREATE_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: FIELD_CREATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }

}

