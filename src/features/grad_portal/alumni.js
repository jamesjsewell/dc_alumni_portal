import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import { Grad, GradCollection } from "./backbone_models/Grad.js"

// actions
import { CRUD_payload, CRUD_methods } from "../util/backbone_ajax.js"

// reducers
const UPDATE_ALUMNI_COLLECTION = "update_alumni_collection",
    EDIT_GRAD = "edit_grad",
    MESSAGE = "message",
    ASYNC = "aysnc"

const initial_state = {

    selected: null,
    editing: null,
    message: null,
    collection: new GradCollection(),
    model: Grad,
    array: [],
    AJAX_payload: CRUD_payload

}

export function ajax_controller(ajaxPayload) {

    return function (dispatch) {

        dispatch({
            type: ASYNC,
            payload: true
        })

        function editItem(collection, id) {
            var model = collection.get(id)
            dispatch({
                type: EDIT_GRAD,
                payload: { selected: model.attributes, editing: true }
            })
        }

        function onSuccess(backbone_collection, message) {

            dispatch({
                type: UPDATE_ALUMNI_COLLECTION,
                payload: { collection: backbone_collection, array: backbone_collection.models }
            })

            handleNotification(message)

            dispatch({
                type: ASYNC,
                payload: false
            })

        }

        function onError(message) {

            handleNotification(message)

            dispatch({
                type: ASYNC,
                payload: false
            })
        }

        function handleNotification(message, time) {

            dispatch({
                type: MESSAGE,
                payload: message
            })

        }
        
        ajaxPayload.on_success_callback = onSuccess
        ajaxPayload.on_error_callback = onError

        new CRUD_methods(ajaxPayload)

    }

}

export function auth_controller(){

    return function(dispatch){

        

    }
}



export function loginUser({ email, password }) {
	return function(dispatch) {
		axios
			.post(`${API_URL}/auth/login`, { email, password })
			.then(response => {
				console.log(response);
				cookies.set("token", response.data.token, { path: "/" });
				cookies.set("user", response.data.user, { path: "/" });
				dispatch({ type: AUTH_USER, payload: response.data.user });
				dispatch({ type: REMOVE_SHELTER_COOKIE, payload: "" });
			})
			.catch(error => {
				dispatch({
					type: LOGIN_ERROR,
					payload: "invalid email or password"
				});
			});
	};
}

export function registerUser({ email, firstName, lastName, password }) {
	return function(dispatch) {
		axios
			.post(`${API_URL}/auth/register`, {
				email,
				firstName,
				lastName,
				password
			})
			.then(response => {
				cookies.set("token", response.data.token, { path: "/" });
				cookies.set("user", response.data.user, { path: "/" });
				dispatch({ type: AUTH_USER, payload: response.data.user });

				dispatch({
					type: REMOVE_SHELTER_COOKIE,
					payload: ""
				});
			})
			.catch(error => {
				dispatch({
					type: REGISTER_ERROR,
					payload: "unable to create account"
				});
			});
	};
}

export function logoutUser(error) {
	return function(dispatch) {
		var shelterCookie = cookies.get("currentShelter");
		dispatch({
			type: UNAUTH_USER,
			payload: error
		});
		dispatch({
			type: ADD_SHELTER_COOKIE,
			payload: shelterCookie
		});
		cookies.remove("token", { path: "/" });
		cookies.remove("user", { path: "/" });
	};
}

export function getForgotPasswordToken({ email }) {
	return function(dispatch) {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
			payload: {
				stateOfSend: "sending email",
				sending: true,
				sendSuccessful: false
			}
		});

		axios
			.post(`${API_URL}/auth/forgot-password`, { email })
			.then(response => {
				dispatch({
					type: FORGOT_PASSWORD_REQUEST,
					payload: {
						stateOfSend: "email sent",
						sending: false,
						sendSuccessful: true
					}
				});
			})
			.catch(error => {
				console.log(error.response);
				dispatch({
					type: FORGOT_PASSWORD_REQUEST,
					payload: {
						stateOfSend: error.response.data.error,
						sending: false,
						sendSuccessful: false
					}
				});
			});
	};
}

export function resetPassword(token, { password }) {
	return function(dispatch) {
		axios
			.post(`${API_URL}/auth/reset-password/${token}`, { password })
			.then(response => {
				dispatch({
					type: RESET_PASSWORD_REQUEST,
					payload: {
						message: response.data.message,
						didReset: response.data.didReset
					}
				});
				// Redirect to login page on successful password reset
				//browserHistory.push('/login');
			})
			.catch(error => {
				dispatch({
					type: RESET_PASSWORD_REQUEST,
					payload: {
						message: error.response.data.error,
						didReset: false
					}
				});
			});
	};
}

export function authenticate(user) {
	return function(dispatch) {
		axios
			.get(`${API_URL}/user/${user._id}`, {
				headers: { Authorization: cookies.get("token") }
			})
			.then(response => {
				if (response.data) {
					dispatch({
						type: AUTH_USER,
						payload: response.data
					});
				}
			})
			.catch(error => {});
	};
}

export const alumniReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

        case UPDATE_ALUMNI_COLLECTION: {

            return _.extend({}, state, {collection: payload.collection, array: payload.array, editing: false })
            break

        }

        case EDIT_GRAD: {

            return _.extend({}, state, {selected: payload.selected, editing: payload.editing, message: '...editing', async_in_progress: false })
            break

        }

        case MESSAGE: {

            return _.extend({}, state, {message: payload})
            break

        }

        case ASYNC:{
            
            return _.extend({}, state, {async_in_progress: payload})
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