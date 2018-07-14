import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { usersReducer } from "./user_auth/user.js"

const rootReducer = combineReducers({user: usersReducer, form: formReducer})

export default rootReducer