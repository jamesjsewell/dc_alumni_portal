import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { userReducer } from "./user_auth/user.js"

const rootReducer = combineReducers({user: userReducer, form: formReducer})

export default rootReducer