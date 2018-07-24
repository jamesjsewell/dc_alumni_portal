import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { API_URL } from "../util/util.js"
// import { updateUser } from "../user_auth/user.js"

const cookies = new Cookies()


const GET_USER_DATA = "get_user_data",
	UPDATE_USER = "update_user",
	ERROR_UPDATING_USER = "error_updating_user"


const initial_state = {

	message: null

}


// export {updateUser}

export function getProfileData(user){
	return function(dispatch){
	
		dispatch({ type: GET_USER_DATA, payload: user })

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

export const profileReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

		case GET_USER_DATA: {
	
			return _.extend({}, state, payload)
		}

		case UPDATE_USER: {
			
			return _.extend({}, state, payload.user)
			break
		}

		case ERROR_UPDATING_USER: {

			return _.extend({}, state, { error_updating_user: true})
			break
		}

    }

    return state
}

const profile = state => state.profile
const user = state => state.user
const uppy = state => state.uppy

export const selector = createStructuredSelector({
	profile,
	user,
	uppy
})