import axios from "axios"
import { PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_RESET, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userContants"
import { PRACT_LIST_RESET } from "../constants/practitionerConstants";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/auth/admin/login', {email, password}, config)
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data.data))
        localStorage.setItem('token', JSON.stringify(data.token))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}
export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
        const {userLogin: {token}} = getState()

        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const {data} = await axios.get('/api/v1/auth/admin/profile', config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const userProfileUpdate = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type:PROFILE_UPDATE_REQUEST
        })
        const {userLogin: {token}} = getState()


        const config = {
            headers : {
                Authorization:`Bearer ${token}`
            }
        }

        const {data} = await axios.patch('/api/v1/admin/updateProfile', user,  config)
        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.data
        })
        
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload:error.response && error.response.data.error ? error.response.data.error : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:PRACT_LIST_RESET})
}