import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { userReducer, userStateReducer } from "../user.js"
import { utilReducer } from "../util.js"

const rootReducer = combineReducers({user: userReducer, userState: userStateReducer, form: formReducer, util: utilReducer})

export default rootReducer