import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { usersReducer } from "./user_auth/user.js"
import { profileReducer } from "./user_profile/profile.js"

const rootReducer = combineReducers({user: usersReducer, profile: profileReducer, form: formReducer})

export default rootReducer