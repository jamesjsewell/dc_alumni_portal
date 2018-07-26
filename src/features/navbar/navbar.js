import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { UNAUTHENTICATE } from "../user_auth/user.js"

const cookies = new Cookies()

export function logout(history) {

	return function(dispatch){

		cookies.remove("user_token", { path: "/" })
		cookies.remove("user", { path: "/" })

		dispatch({
			type: UNAUTHENTICATE,
			payload: null
        })
        history.replace("/alumni")
	}	
}

const user = state => state.user

export const selector = createStructuredSelector({
    user
})