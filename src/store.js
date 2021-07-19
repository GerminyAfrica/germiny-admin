import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {practitionerListReducer, practitionerDeleteReducer, practitionerDetailsReducer, practitionerVerifyReducer, practitionerDeactivateReducer, practitionerActivateReducer, practitionerInviteReducer, practitionerDeclineReducer, practitionerRejectReducer, practitionerEmailReducer} from './reducers/practitionerReducers'
import {patientListReducer, patientDeleteReducer, patientDetailsReducer} from './reducers/patientReducers'
import {userLoginReducer, userDetailsReducer, profileUpdateReducer} from './reducers/userReducers'
import {fieldListReducer, fieldDeleteReducer, fieldCreateReducer} from './reducers/fieldReducers'
import {emailListReducer, emailDeleteReducer, emailCreateReducer, emailDetailsReducer, emailUpdateReducer} from './reducers/emailReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userDetails:userDetailsReducer,
    profileUpdate:profileUpdateReducer,
    practitionerList: practitionerListReducer,
    practitionerDelete: practitionerDeleteReducer,
    practitionerDetails:practitionerDetailsReducer,
    practitionerVerify: practitionerVerifyReducer,
    practitionerDeactivate:practitionerDeactivateReducer,
    practitionerActivate:practitionerActivateReducer,
    practitionerInvite: practitionerInviteReducer,
    practitionerDecline: practitionerDeclineReducer,
    practitionerReject: practitionerRejectReducer,
    practitionerEmail:practitionerEmailReducer,
    patientList: patientListReducer,
    patientDelete: patientDeleteReducer,
    patientDetails:patientDetailsReducer,
    fieldList:fieldListReducer,
    fieldDelete:fieldDeleteReducer,
    fieldCreate:fieldCreateReducer,
    emailList:emailListReducer,
    emailDelete:emailDeleteReducer,
    emailCreate:emailCreateReducer,
    emailDetails:emailDetailsReducer,
    emailUpdate:emailUpdateReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const usertokenFromStorage = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null


const initialState = {
    userLogin: {userInfo:userInfoFromStorage, token:usertokenFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store