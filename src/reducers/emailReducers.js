import { EMAIL_LIST_FAIL, 
        EMAIL_LIST_REQUEST, 
        EMAIL_LIST_SUCCESS, 
        EMAIL_LIST_RESET, 
        EMAIL_DELETE_REQUEST, 
        EMAIL_DELETE_SUCCESS, 
        EMAIL_DELETE_FAIL, 
        EMAIL_CREATE_SUCCESS, 
        EMAIL_CREATE_FAIL, 
        EMAIL_CREATE_REQUEST, 
        EMAIL_DETAILS_REQUEST, 
        EMAIL_DETAILS_SUCCESS, 
        EMAIL_DETAILS_FAIL, 
        EMAIL_RESET, 
        EMAIL_UPDATE_REQUEST, 
        EMAIL_UPDATE_SUCCESS, 
        EMAIL_UPDATE_FAIL, 
        EMAIL_DETAILS_RESET} from "../constants/emailConstants"

export const emailListReducer = (state = {emails: [] }, action) => {
    switch (action.type) {
        case EMAIL_LIST_REQUEST:
            return { loading:true, emails: [] }
        case EMAIL_LIST_SUCCESS:
            return { loading:false, emails: action.payload.data }
        case EMAIL_LIST_FAIL:
                return { loading:false, error: action.payload }
        case EMAIL_LIST_RESET:
            return {emails:[]}

        default:
            return state   
    }
}

export const emailCreateReducer = (state = { }, action) => {
    switch (action.type) {
        case EMAIL_CREATE_REQUEST:
            return { loading:true }
        case EMAIL_CREATE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case EMAIL_CREATE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const emailDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case EMAIL_DELETE_REQUEST:
            return { loading:true }
        case EMAIL_DELETE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case EMAIL_DELETE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const emailDetailsReducer = (state = { email: {} }, action) => {
    switch (action.type) {
        case EMAIL_DETAILS_REQUEST:
            return { ...state, loading:true}
        case EMAIL_DETAILS_SUCCESS:
            return { loading:false, email: action.payload.data }
        case EMAIL_DETAILS_FAIL:
            return { loading:false, error: action.payload }
        case EMAIL_RESET:
            return { email:{}}

        default:
            return state   
    }
}

export const emailUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case EMAIL_UPDATE_REQUEST:
            return { loading:true }
        case EMAIL_UPDATE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case EMAIL_UPDATE_FAIL:
            return { loading:false, error: action.payload }
        case EMAIL_RESET:
            return { email:{}}
        default:
            return state   
    }
}