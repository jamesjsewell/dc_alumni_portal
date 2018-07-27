import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { API_URL } from "./global_vars"

const cookies = new Cookies()

const MESSAGE = "message",
	ASYNC = "aysnc"
	
export const AUTHENTICATE = "authenticate",
	UNAUTHENTICATE = "unauthenticate",
	LOGIN_ERROR = "login_error",
	ERROR_REGISTERING = "error_registering"

const PASSWORD_RESET_REQUEST = "password_reset_request",
	PASSWORD_REQUEST_FAILED = "password_request_failed",
	PASSWORD_REQUEST_SENT = "password_request_sent",
	RESET_PASSWORD = "reset_password",
	RESET_PASSWORD_ERROR = "reset_password_error",
	UPDATE_USER = "update_user",
	ERROR_UPDATING_USER = "error_updating_user"


export function auto_log_in(authenticate_user, loggedInUser){
    
	return function(dispatch){
		
		if(!loggedInUser.email){
			var token = cookies.get("user_token")
			var user = cookies.get("user")
		
			if (token && user) {
				authenticate_user(user, token)
			} 
		}	   
	}
}

export function login({ email, password }) {

	return function(dispatch){

		if(email && password){

			axios
			.post(`${API_URL}/user/login`, { email, password })
			.then(response => {
				
				if(response && response.data && response.data.user_token){
					cookies.set("user_token", response.data.user_token, { path: "/" })
					cookies.set("user", response.data.user, { path: "/" })
					dispatch({ type: AUTHENTICATE, payload: { user: response.data.user } })
				}

				if(response && response.data && response.data.error){
					dispatch({
						type: LOGIN_ERROR,
						payload: { message: response.data.error }
					})
				}
				
			
			})
			.catch(error => {
			
				dispatch({
					type: LOGIN_ERROR,
					payload: { message: " make sure the email and password are correct" }
				})
			})

		}	
	}	
}

export function authenticate(user, token) {

	return function(dispatch){

		if(user){
			axios
			.get(`${API_URL}/user/authenticate/${user._id}`, {
				headers: { Authorization: token? token : cookies.get("user_token") }
			})
			.then(response => {
			
				if (response.data) {
					dispatch({
						type: AUTHENTICATE,
						payload: { user: response.data.user }
					})
				}
			})
			.catch(error => { return })
		}
	}
}

export function register(info) {

	return function(dispatch){

		const { email, password } = info
		
		if(email && password){

			axios
			.post(`${API_URL}/user/register`, info)
			.then(response => {
				
				if(response && response.data && response.data.user_token){
					cookies.set("user_token", response.data.user_token, { path: "/" })
					cookies.set("user", response.data.user, { path: "/" })
					dispatch({ type: AUTHENTICATE, payload: { user: response.data.user }})

				}
				if(response && response.data && response.data.error){
					dispatch({
						type: ERROR_REGISTERING,
						payload: { message: response.data.error }
					})
				}

			})
			.catch(error => {
			
				dispatch({
					type: ERROR_REGISTERING,
					payload: { message: " something went wrong, unable to create account" }
				})
			})

		}	
	}
}

export function logout(history, user, routes) {

	return function(dispatch){

		cookies.remove("user_token", { path: "/" })
        cookies.remove("user", { path: "/" })
        
        if(user.account_type === "grad"){
            history.replace( routes.GRAD_LOGIN )
        }

        if(user.account_type === "employer"){
            history.replace( routes.EMPLOYER_LOGIN )
        }

		dispatch({
			type: UNAUTHENTICATE,
			payload: null
		})
	}	
}

export function getForgotPasswordToken(email) {
	
	return function(dispatch){

		dispatch({
			type: PASSWORD_RESET_REQUEST,
			payload: email
		})
	
		axios
			.post(`${API_URL}/user/forgot-password`, { email: email })
			.then(response => {
				
				dispatch({
					type: PASSWORD_REQUEST_SENT,
					payload: email
				})
			})
			.catch(error => {
				
				dispatch({
					type: PASSWORD_REQUEST_FAILED,
					payload: null
				})
			})
	}
}

export function resetPassword(user_token, password) {

	return function(dispatch){

		axios
		.post(`${API_URL}/user/reset-password/${user_token}`, { password: password })
		.then(response => {
			dispatch({
				type: RESET_PASSWORD,
				payload: {user: response.data.user}
			})
		})
		.catch(error => {
			dispatch({
				type: RESET_PASSWORD_ERROR,
				payload: null
			})
		})
	}
}


export function updateUser(userId, updated) {
	
	return function(dispatch){

		var token = cookies.get("user_token")
	
		axios({ method: 'put', url: `${API_URL}/user/${userId}`, data: updated, headers: { Authorization: cookies.get("user_token") }})
			.then(response => {
				
				dispatch({
					type: UPDATE_USER,
					payload: { user: response.data.user }
				})
			})
			.catch(error => {
				
				dispatch({
					type: ERROR_UPDATING_USER,
					payload: null
				})
			})
	}
}

const initial_user = {}

export const userReducer = function(state = initial_user, action) {

    var payload = action.payload

    switch (action.type) {

        case AUTHENTICATE: {
		
            return _.extend({}, state, payload.user)
            break

		}
		
		case UNAUTHENTICATE: {
			
			return { }
			break
		}
		
		case RESET_PASSWORD: {

			return _.extend({}, state, payload.user)
			break
		}

		case UPDATE_USER: {

            return _.extend({}, state, payload.user)
            break
		}

    }

    return state
}

const initial_user_state = {

    auth_message: null,
	login_error_message: null,
	register_error_message: null,
	password_request: null,
	email_recipient: null,
	password_did_reset: false,
	error_resetting_password: false,
	error_updating_user: true

}

export const userStateReducer = function(state = initial_user_state, action) {

    var payload = action.payload

    switch (action.type) {

        case AUTHENTICATE: {
		
            return _.extend({}, state, payload, { login_error_message: null, register_error_message: null })
            break

		}

		case ERROR_REGISTERING: {

			return _.extend({}, state, {register_error_message: payload.message})
			break
		}

		case LOGIN_ERROR: {

			return _.extend({}, state, {login_error_message: payload.message})
			break
		}

		case PASSWORD_RESET_REQUEST: {

			return _.extend({}, state, { password_request: "sending", email_recipient: payload })
			break
		}

		case PASSWORD_REQUEST_SENT: {
			
			return _.extend({}, state, { password_request: "sent", email_recipient: payload  })
			break
		}

		case PASSWORD_REQUEST_FAILED: {
			
			return _.extend({}, state, { password_request: "failed" })
			break
		}
		
		case RESET_PASSWORD: {

			return _.extend({}, state, { password_did_reset: true, error_resetting_password: false })
			break
		}

		case RESET_PASSWORD_ERROR: {

			return _.extend({}, state, { password_did_reset: false, error_resetting_password: true })
			break
		}

		case ERROR_UPDATING_USER: {

			return _.extend({}, state, { error_updating_user: true})
			break
		}

    }

    return state
}

const user = state => state.user
const userState = state => state.userState

export const selector = createStructuredSelector({
    user,
    userState
})