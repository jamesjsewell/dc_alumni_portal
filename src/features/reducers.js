import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { itemsReducer } from "./view_alumni/alumni.js"

const rootReducer = combineReducers({items: itemsReducer, form: formReducer})

export default rootReducer