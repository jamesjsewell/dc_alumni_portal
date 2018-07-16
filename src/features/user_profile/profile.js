import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { API_URL } from "../util/util.js"

const cookies = new Cookies()


const initial_state = {

    message: null

}



// export const usersReducer = function(state = initial_state, action) {

//     var payload = action.payload

//     switch (action.type) {

//         case AUTHENTICATE: {
		
//             return _.extend({}, state, { user: payload, login_error_message: null, register_error_message: null })
//             break

// 		}
		
// 		case UNAUTHENTICATE: {
			
// 			return _.extend({}, state, { user: null})
// 			break
// 		}

// 		case ERROR_REGISTERING: {

// 			return _.extend({}, state, {register_error_message: payload.message})
// 			break
// 		}

// 		case LOGIN_ERROR: {

// 			return _.extend({}, state, {login_error_message: payload.message})
// 			break
// 		}

// 		case PASSWORD_RESET_REQUEST: {

// 			return _.extend({}, state, { password_request: "sending", email_recipient: payload })
// 			break
// 		}

// 		case PASSWORD_REQUEST_SENT: {
			
// 			return _.extend({}, state, { password_request: "sent", email_recipient: payload  })
// 			break
// 		}

// 		case PASSWORD_REQUEST_FAILED: {
			
// 			return _.extend({}, state, { password_request: "failed" })
// 			break
// 		}
		
// 		case RESET_PASSWORD: {

// 			return _.extend({}, state, { password_did_reset: true, error_resetting_password: false  })
// 			break
// 		}

// 		case RESET_PASSWORD_ERROR: {

// 			return _.extend({}, state, { password_did_reset: false, error_resetting_password: true })
// 			break
// 		}

//     }

//     return state
// }

// selected
// editing
// message
// collection
// model
// array
// AJAX_payload

const profile = state => state.profile
const user = state => state.user



export const selector = createStructuredSelector({
	profile,
	user
})