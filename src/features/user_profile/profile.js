import _ from "underscore"
import axios from "axios"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"
import Cookies from "universal-cookie"
import { API_URL } from "../util/util.js"
import { updateUser } from "../user_auth/user.js"

const cookies = new Cookies()


const initial_state = {

    message: null

}

export {updateUser}

const user = state => state.user

export const selector = createStructuredSelector({
	user
})