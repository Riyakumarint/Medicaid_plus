import {combineReducers} from 'redux'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer'
// import profile from './profileReducer'

export default combineReducers({
    auth,
    token,
    users,
    // profile
})
