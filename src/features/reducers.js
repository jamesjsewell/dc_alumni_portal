import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { alumniReducer } from "./grad_portal/alumni.js"

const rootReducer = combineReducers({alumni: alumniReducer, form: formReducer})

export default rootReducer