import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { alumniReducer } from "./user_portal/alumni.js"

const rootReducer = combineReducers({alumni: alumniReducer, form: formReducer})

export default rootReducer