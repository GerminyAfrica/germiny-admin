import { FIELD_LIST_FAIL, FIELD_LIST_REQUEST, FIELD_LIST_SUCCESS, FIELD_LIST_RESET, FIELD_DELETE_REQUEST, FIELD_DELETE_SUCCESS, FIELD_DELETE_FAIL, FIELD_CREATE_SUCCESS, FIELD_CREATE_FAIL, FIELD_CREATE_REQUEST} from "../constants/fieldConstants"

export const fieldListReducer = (state = {fields: [] }, action) => {
    switch (action.type) {
        case FIELD_LIST_REQUEST:
            return { loading:true, fields: [] }
        case FIELD_LIST_SUCCESS:
            return { loading:false, fields: action.payload.data }
        case FIELD_LIST_FAIL:
                return { loading:false, error: action.payload }
        case FIELD_LIST_RESET:
            return {fields:[]}

        default:
            return state   
    }
}

export const fieldCreateReducer = (state = { }, action) => {
    switch (action.type) {
        case FIELD_CREATE_REQUEST:
            return { loading:true }
        case FIELD_CREATE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case FIELD_CREATE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const fieldDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case FIELD_DELETE_REQUEST:
            return { loading:true }
        case FIELD_DELETE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case FIELD_DELETE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}