import { PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_RESET, PROFILE_UPDATE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_RESET, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userContants"

export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading:true}
        case USER_LOGIN_SUCCESS:
            return { loading:false, userInfo: action.payload.data, token:action.payload.token }
        case USER_LOGIN_FAIL:
            return { loading:false, error: action.payload }
        case USER_LOGOUT:
            return {}

        default:
            return state   
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading:true}
        case USER_DETAILS_SUCCESS:
            return { loading:false, user: action.payload.data }
        case USER_DETAILS_FAIL:
            return { loading:false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user:{}}

        default:
            return state   
    }
}

export const profileUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return { loading:true}
        case PROFILE_UPDATE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case PROFILE_UPDATE_FAIL:
            return { loading:false, error: action.payload }
        case PROFILE_RESET:
            return { }     

        default:
            return state   
    }
}