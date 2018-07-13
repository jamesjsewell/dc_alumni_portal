import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { usersReducer } from "./user_portal/user.js"

const rootReducer = combineReducers({users: usersReducer, form: formReducer})

export default rootReducer