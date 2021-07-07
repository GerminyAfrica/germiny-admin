import { PATIENT_LIST_REQUEST, PATIENT_LIST_SUCCESS, PATIENT_LIST_FAIL, PATIENT_LIST_RESET, PATIENT_DELETE_REQUEST, PATIENT_DELETE_SUCCESS, PATIENT_DELETE_FAIL, PATIENT_DETAILS_REQUEST, PATIENT_DETAILS_SUCCESS, PATIENT_DETAILS_FAIL, PATIENT_DETAILS_RESET } from "../constants/patientConstants";
export const patientListReducer = (state = {patients: [] }, action) => {
    switch (action.type) {
        case PATIENT_LIST_REQUEST:
            return { loading:true, patients: [] }
        case PATIENT_LIST_SUCCESS:
            return { loading:false, patients: action.payload.data }
        case PATIENT_LIST_FAIL:
                return { loading:false, error: action.payload }
        case PATIENT_LIST_RESET:
            return {patients:[]}

        default:
            return state   
    }
}

export const patientDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case PATIENT_DELETE_REQUEST:
            return { loading:true }
        case PATIENT_DELETE_SUCCESS:
            return { loading:false, success: action.payload.success }
        case PATIENT_DELETE_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const patientDetailsReducer = (state = { patient: {} }, action) => {
    switch (action.type) {
        case PATIENT_DETAILS_REQUEST:
            return { ...state, loading:true}
        case PATIENT_DETAILS_SUCCESS:
            return { loading:false, patient: action.payload.data }
        case PATIENT_DETAILS_FAIL:
            return { loading:false, error: action.payload }
        case PATIENT_DETAILS_RESET:
            return { patient:{}}

        default:
            return state   
    }
}