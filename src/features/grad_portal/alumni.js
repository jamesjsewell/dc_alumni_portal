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
	FORGOT_PASSWORD = "forgot_password",
	RESET_PASSWORD = "reset_password",
	LOGIN_ERROR = "login_error",
	ERROR_REGISTERING = "error_registering"

const initial_state = {

    message: null,
    collection: new GradCollection(),
    model: Grad,
	array: [],
	grad: null,
	auth_message: null

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

		// dispatch({
		// 	type: FORGOT_PASSWORD,
		// 	payload: null
		// })
	
		axios
			.post(`${API_URL}/grad/forgot-password`, { email: email })
			.then(response => {
				console.log(response)
				// dispatch({
				// 	type: FORGOT_PASSWORD,
				// 	payload: {
				// 		stateOfSend: "email sent",
				// 		sending: false,
				// 		sendSuccessful: true
				// 	}
				// })
			})
			.catch(error => {
				console.log(response)
				// dispatch({
				// 	type: FORGOT_PASSWORD,
				// 	payload: {
				// 		stateOfSend: error.response.data.error,
				// 		sending: false,
				// 		sendSuccessful: false
				// 	}
				// })
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