import { PRACT_LIST_REQUEST, PRACT_LIST_SUCCESS, PRACT_LIST_FAIL, PRACT_LIST_RESET, PRACT_DELETE_REQUEST, PRACT_DELETE_SUCCESS, PRACT_DELETE_FAIL, 
    PRACT_DETAILS_REQUEST, PRACT_DETAILS_SUCCESS, PRACT_DETAILS_FAIL, PRACT_DETAILS_RESET, PRACT_VERIFY_REQUEST, PRACT_VERIFY_SUCCESS, 
    PRACT_VERIFY_FAIL, PRACT_DEACTIVATE_REQUEST, PRACT_DEACTIVATE_SUCCESS, PRACT_DEACTIVATE_FAIL, PRACT_ACTIVATE_REQUEST, PRACT_ACTIVATE_SUCCESS, 
    PRACT_ACTIVATE_FAIL, PRACT_INVITE_REQUEST, PRACT_INVITE_SUCCESS, PRACT_INVITE_FAIL, PRACT_DECLINE_REQUEST, PRACT_DECLINE_SUCCESS, PRACT_DECLINE_FAIL,
    PRACT_REJECT_REQUEST, PRACT_REJECT_SUCCESS, PRACT_REJECT_FAIL, PRACT_RESET, PRACT_EMAIL_REQUEST, PRACT_EMAIL_SUCCESS, PRACT_EMAIL_FAIL, PRACT_UPDATE_REQUEST, PRACT_UPDATE_SUCCESS, PRACT_UPDATE_FAIL } from "../constants/practitionerConstants";
    
export const practitionerListReducer = (state = {practitioners: [] }, action) => {
    switch (action.type) {
        case PRACT_LIST_REQUEST:
            return { loading:true, practitioners: [] }
        case PRACT_LIST_SUCCESS:
            return { loading:false, practitioners: action.payload.data }
        case PRACT_LIST_FAIL:
                return { loading:false, error: action.payload }
        case PRACT_LIST_RESET:
            return {practitioners:[]}

        default:
            return state   
    }
}

export const practitionerDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_DELETE_REQUEST:
            return { loading:true }
        case PRACT_DELETE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case PRACT_DELETE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const practitionerDetailsReducer = (state = { practitioner: {} }, action) => {
    switch (action.type) {
        case PRACT_DETAILS_REQUEST:
            return { ...state, loading:true}
        case PRACT_DETAILS_SUCCESS:
            return { loading:false, practitioner: action.payload.data }
        case PRACT_DETAILS_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_DETAILS_RESET:
            return { practitioner:{}}

        default:
            return state   
    }
}

export const practitionerVerifyReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_VERIFY_REQUEST:
            return { loading:true }
        case PRACT_VERIFY_SUCCESS:
            return { loading:false, verify: action.payload }
        case PRACT_VERIFY_FAIL:
                return { loading:false, error: action.payload }
        case PRACT_RESET:
                return {}

        default:
            return state   
    }
}

export const practitionerDeactivateReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_DEACTIVATE_REQUEST:
            return { loading:true }
        case PRACT_DEACTIVATE_SUCCESS:
            return { loading:false, deactivate: action.payload }
        case PRACT_DEACTIVATE_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}

export const practitionerActivateReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_ACTIVATE_REQUEST:
            return { loading:true }
        case PRACT_ACTIVATE_SUCCESS:
            return { loading:false, activate: action.payload }
        case PRACT_ACTIVATE_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}

export const practitionerInviteReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_INVITE_REQUEST:
            return { loading:true }
        case PRACT_INVITE_SUCCESS:
            return { loading:false, invite: action.payload }
        case PRACT_INVITE_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}


export const practitionerDeclineReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_DECLINE_REQUEST:
            return { loading:true }
        case PRACT_DECLINE_SUCCESS:
            return { loading:false, decline: action.payload }
        case PRACT_DECLINE_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}

export const practitionerRejectReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_REJECT_REQUEST:
            return { loading:true }
        case PRACT_REJECT_SUCCESS:
            return { loading:false, reject: action.payload }
        case PRACT_REJECT_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}

export const practitionerEmailReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_EMAIL_REQUEST:
            return { loading:true }
        case PRACT_EMAIL_SUCCESS:
            return { loading:false, email: action.payload }
        case PRACT_EMAIL_FAIL:
            return { loading:false, error: action.payload }
        case PRACT_RESET:
            return {}
        default:
            return state   
    }
}

export const profileUpdateReducer = (state = { }, action) => {
    switch (action.type) {
        case PRACT_UPDATE_REQUEST:
            return { loading:true}
        case PRACT_UPDATE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case PRACT_UPDATE_FAIL:
            return { loading:false, error: action.payload }    

        default:
            return state   
    }
}