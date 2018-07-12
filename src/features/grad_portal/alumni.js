import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { API_URL } from "../util/util.js"
import { Grad, GradCollection } from "./backbone_models/Grad.js"

const cookies = new Cookies()

const MESSAGE = "message",
	ASYNC = "aysnc"
	
const AUTHENTICATE = "authenticate",
	UNAUTHENTICATE = "unauthenticate",
	LOGIN_ERROR = "login_error",
	ERROR_REGISTERING = "error_registering"

const PASSWORD_RESET_REQUEST = "password_reset_request",
	PASSWORD_REQUEST_FAILED = "password_request_failed",
	PASSWORD_REQUEST_SENT = "password_request_sent",
	RESET_PASSWORD = "reset_password"


const initial_state = {

    message: null,
    collection: new GradCollection(),
    model: Grad,
	array: [],
	grad: null,
	auth_message: null,
	password_request: null,
	email_recipient: null

}

export function auto_log_in(authenticate_grad, loggedInGrad){

	return function(dispatch){
		
		if(!loggedInGrad){
			var token = cookies.get("grad_token")
			var grad = cookies.get("grad")
		
			if (token && grad) {
				authenticate_grad(grad, token)
			} 
		}	   
	}
}

export function login({ email, password }) {

	return function(dispatch){

		if(email && password){

			axios
			.post(`${API_URL}/grad/login`, { email, password })
			.then(response => {
				
				cookies.set("grad_token", response.data.grad_token, { path: "/" })
				cookies.set("grad", response.data.grad, { path: "/" })
				dispatch({ type: AUTHENTICATE, payload: response.data.grad })
			
			})
			.catch(error => {
			
				dispatch({
					type: LOGIN_ERROR,
					payload: { message: " something went wrong" }
				})
			})

		}	
	}	
}

export function authenticate(grad, token) {

	return function(dispatch){

		if(grad){
			axios
			.get(`${API_URL}/grad/authenticate/${grad._id}`, {
				headers: { Authorization: token? token : cookies.get("grad_token") }
			})
			.then(response => {
			
				if (response.data) {
					dispatch({
						type: AUTHENTICATE,
						payload: response.data.grad
					})
				}
			})
			.catch(error => { return })
		}
	}
}

export function register({ email, fname, lname, password }) {

	return function(dispatch){

		if(email && password){

			axios
			.post(`${API_URL}/grad/register`, {
				email,
				fname,
				lname,
				password
			})
			.then(response => {
			
				cookies.set("grad_token", response.data.grad_token, { path: "/" })
				cookies.set("grad", response.data.grad, { path: "/" })
				dispatch({ type: AUTHENTICATE, payload: response.data.grad })

			})
			.catch(error => {
				
				dispatch({
					type: ERROR_REGISTERING,
					payload: { message: " unable to create account" }
				})
			})

		}	
	}
}

export function logout() {

	return function(dispatch){

		cookies.remove("grad_token", { path: "/" })
		cookies.remove("grad", { path: "/" })

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
			.post(`${API_URL}/grad/forgot-password`, { email: email })
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

export function resetPassword(grad_token, password) {

	return function(dispatch){

		axios
		.post(`${API_URL}/grad/reset-password/${grad_token}`, { password: password })
		.then(response => {
			dispatch({
				type: RESET_PASSWORD,
				payload: {
					message: response.data.message,
					didReset: response.data.didReset
				}
			})
			// Redirect to login page on successful password reset
			//browserHistory.push('/login')
		})
		.catch(error => {
			dispatch({
				type: RESET_PASSWORD,
				payload: {
					message: error.response.data.error,
					didReset: false
				}
			})
		})
	}
}

export const alumniReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

        case AUTHENTICATE: {
		
            return _.extend({}, state, { grad: payload })
            break

		}
		
		case UNAUTHENTICATE: {
			
			return _.extend({}, state, { grad: null})
			break
		}

		case ERROR_REGISTERING: {

			return _.extend({}, state, {auth_message: payload.message})
			break
		}

		case LOGIN_ERROR: {

			return _.extend({}, state, {auth_message: payload.message})
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

    }

    return state
}

// selected
// editing
// message
// collection
// model
// array
// AJAX_payload

const alumni = state => state.alumni


export const selector = createStructuredSelector({
    alumni
})