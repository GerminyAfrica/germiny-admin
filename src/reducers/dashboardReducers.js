import { ACTIVE_USERS_REQUEST,
        ACTIVE_USERS_SUCCESS,
        ACTIVE_USERS_FAIL,
        ONLINE_PRACT_REQUEST, 
        ONLINE_PRACT_SUCCESS, 
        ONLINE_PRACT_FAIL, 
        TOTAL_REQUESTS_REQUEST, 
        TOTAL_REQUESTS_SUCCESS, 
        TOTAL_REQUESTS_FAIL, 
        COMPLETED_JOBS_REQUEST, 
        COMPLETED_JOBS_SUCCESS, 
        COMPLETED_JOBS_FAIL } from "../constants/dashboardConstants"

export const activeUsersReducer = (state = {activeUsers: [] }, action) => {
    switch (action.type) {
        case ACTIVE_USERS_REQUEST:
            return { loading:true, activeUsers: [] }
        case ACTIVE_USERS_SUCCESS:
            return { loading:false, activeUsers: action.payload.data }
        case ACTIVE_USERS_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const onlinePractitionersReducer = (state = { onlinePracts: [] }, action) => {
    switch (action.type) {
        case ONLINE_PRACT_REQUEST:
            return { loading:true, onlinePracts: [] }
        case ONLINE_PRACT_SUCCESS:
            return { loading:false, onlinePracts: action.payload.data }
        case ONLINE_PRACT_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const totalRequestsReducer = (state = { totalRequests: [] }, action) => {
    switch (action.type) {
        case TOTAL_REQUESTS_REQUEST:
            return { loading:true, totalRequests: [] }
        case TOTAL_REQUESTS_SUCCESS:
            return { loading:false, totalRequests: action.payload.data }
        case TOTAL_REQUESTS_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}

export const completedJobsReducer = (state = { completedJobs: [] }, action) => {
    switch (action.type) {
        case COMPLETED_JOBS_REQUEST:
            return { loading:true, completedJobs: [] }
        case COMPLETED_JOBS_SUCCESS:
            return { loading:false, completedJobs: action.payload.data }
        case COMPLETED_JOBS_FAIL:
                return { loading:false, error: action.payload }

        default:
            return state   
    }
}