import _ from 'underscore'
import axios from 'axios'
import { combineReducers } from 'redux'
import { createStructuredSelector } from 'reselect'
import Cookies from 'universal-cookie'
import { API_URL } from './global_vars'

const cookies = new Cookies()

const MESSAGE = 'message',
  ASYNC = 'aysnc'

export const AUTHENTICATE = 'authenticate',
  UNAUTHENTICATE = 'unauthenticate',
  LOGIN_ERROR = 'login_error',
  ERROR_REGISTERING = 'error_registering'

const PASSWORD_RESET_REQUEST = 'password_reset_request',
  PASSWORD_REQUEST_FAILED = 'password_request_failed',
  PASSWORD_REQUEST_SENT = 'password_request_sent',
  RESET_PASSWORD = 'reset_password',
  RESET_PASSWORD_ERROR = 'reset_password_error',
  UPDATE_USER = 'update_user',
  ERROR_UPDATING_USER = 'error_updating_user',
  DELETE_USER = 'delete_user',
  ERROR_DELETING_USER = 'error_deleting_user'

import { setAsync } from './util.js'
export { setAsync }

export function auto_log_in (authenticate_user, loggedInUser) {
  return function (dispatch) {
    if (!loggedInUser.email) {
      var token = cookies.get('dc_user_token')
      var user = cookies.get('dc_user_obj')

      if (token && user) {
        authenticate_user(user, token)
      }
    }
  }
}

export function login ({ email, password }) {
  return function (dispatch) {
    if (email && password) {
      dispatch({type: ASYNC, payload: { async: true }})

      axios
        .post(`${API_URL}/user/login`, { email, password })
        .then(response => {
          if (response && response.data && response.data.dc_user_token) {
            cookies.set('dc_user_token', response.data.dc_user_token, { path: '/' })
            cookies.set('dc_user_obj', response.data.user, { path: '/' })
            dispatch({ type: AUTHENTICATE, payload: { user: response.data.user } })
          }

          if (response && response.data && response.data.error) {
            dispatch({
              type: LOGIN_ERROR,
              payload: { message: response.data.error }
            })
          }

          dispatch({type: ASYNC, payload: { async: false }})
        })
        .catch(error => {
          dispatch({
            type: LOGIN_ERROR,
            payload: { message: ' make sure the email and password are correct' }
          })

          dispatch({type: ASYNC, payload: { async: false }})
        })
    }
  }
}

export function authenticate (user, token) {
  return function (dispatch) {
    if (user) {
      dispatch({type: ASYNC, payload: { async: true }})

      axios
        .get(`${API_URL}/user/authenticate/${user._id}`, {
          headers: { Authorization: token || cookies.get('dc_user_token') }
        })
        .then(response => {
          if (response.data) {
            dispatch({
              type: AUTHENTICATE,
              payload: { user: response.data.user }
            })
          }

          dispatch({type: ASYNC, payload: { async: false }})
        })
        .catch(error => { dispatch({type: ASYNC, payload: { async: false }}) })
    }
  }
}

export function register (info) {
  return function (dispatch) {
    const { email, password } = info

    if (email && password) {
      dispatch({type: ASYNC, payload: { async: true }})

      axios
        .post(`${API_URL}/user/register`, info)
        .then(response => {
          if (response && response.data && response.data.dc_user_token) {
            cookies.set('dc_user_token', response.data.dc_user_token, { path: '/' })
            cookies.set('dc_user_obj', response.data.user, { path: '/' })
            dispatch({ type: AUTHENTICATE, payload: { user: response.data.user }})
          }
          if (response && response.data && response.data.error) {
            dispatch({
              type: ERROR_REGISTERING,
              payload: { message: response.data.error }
            })
          }

          dispatch({type: ASYNC, payload: { async: false }})
        })
        .catch(error => {
          dispatch({
            type: ERROR_REGISTERING,
            payload: { message: ' something went wrong, unable to create account' }
          })

          dispatch({type: ASYNC, payload: { async: false }})
        })
    }
  }
}

export function logout (history, user, routes) {
  return function (dispatch) {
    cookies.remove('dc_user_token', { path: '/' })
    cookies.remove('dc_user_obj', { path: '/' })

    if (user.account_type === 'grad') {
      history.replace(routes.GRAD_LOGIN)
    }

    if (user.account_type === 'employer') {
      history.replace(routes.EMPLOYER_LOGIN)
    }

    var emptyUser = {}
    for (var attribute in user) {
      emptyUser[attribute] = null
    }

    dispatch({
      type: UNAUTHENTICATE,
      payload: {user: emptyUser}
    })
  }
}

export function getForgotPasswordToken (email) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
      payload: email
    })

    dispatch({type: ASYNC, payload: { async: true }})

    axios
      .post(`${API_URL}/user/forgot-password`, { email: email })
      .then(response => {
        dispatch({
          type: PASSWORD_REQUEST_SENT,
          payload: email
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
      .catch(error => {
        dispatch({
          type: PASSWORD_REQUEST_FAILED,
          payload: null
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
  }
}

export function resetPassword (dc_user_token, password, routes, history) {
  return function (dispatch) {
    dispatch({type: ASYNC, payload: { async: true }})

    axios
      .post(`${API_URL}/user/reset-password/${dc_user_token}`, { password: password })
      .then(response => {
        if (response && response.data && response.data.dc_user_token) {
          cookies.set('dc_user_token', response.data.dc_user_token, { path: '/' })
          cookies.set('dc_user_obj', response.data.user, { path: '/' })
          dispatch({
            type: RESET_PASSWORD,
            payload: {user: response.data.user}
          })

          var user = response.data.user
          if (user.account_type === 'grad') {
            history.replace(routes.GRAD_PROFILE)
          }
          if (user.account_type === 'employer') {
            history.replace(routes.EMPLOYER_PROFILE)
          }
        }
        if (response && response.data && response.data.error) {
          dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: null
          })
        }

        dispatch({type: ASYNC, payload: { async: false }})
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: null
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
  }
}

export function updateUser (userId, updated) {
  return function (dispatch) {
    var token = cookies.get('dc_user_token')

    dispatch({type: ASYNC, payload: { async: true }})

    axios({ method: 'put', url: `${API_URL}/user/${userId}`, data: updated, headers: { Authorization: cookies.get('dc_user_token') }})
      .then(response => {
        dispatch({
          type: UPDATE_USER,
          payload: { user: response.data.user }
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
      .catch(error => {
        dispatch({
          type: ERROR_UPDATING_USER,
          payload: null
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
  }
}

export function deleteUser (userId) {
  return function (dispatch) {
    var token = cookies.get('dc_user_token')

    dispatch({type: ASYNC, payload: { async: true }})

    axios({ method: 'delete', url: `${API_URL}/user/${userId}`, headers: { Authorization: cookies.get('dc_user_token') }})
      .then(response => {
        if (response.data && response.data.id) {
          dispatch({
            type: DELETE_USER,
            payload: null
          })
        } else {
          dispatch({
            type: ERROR_DELETING_USER,
            payload: null
          })
        }

        dispatch({type: ASYNC, payload: { async: false }})
      })
      .catch(error => {
        dispatch({
          type: ERROR_DELETING_USER,
          payload: null
        })

        dispatch({type: ASYNC, payload: { async: false }})
      })
  }
}

const initial_user = {}

export const userReducer = function (state = initial_user, action) {
  var payload = action.payload
  var user = {}

  if (payload && payload.user) {
    user = payload.user
  }

  switch (action.type) {
    case AUTHENTICATE: {
      return _.extend({}, state, user)
      break
    }

    case UNAUTHENTICATE: {
      return _.extend({}, state, user)
      break
    }

    case RESET_PASSWORD: {
      return _.extend({}, state, user)
      break
    }

    case UPDATE_USER: {
      return _.extend({}, state, user)
      break
    }

    case DELETE_USER: {
      return {}
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
  error_updating_user: false,
  error_deleting_user: false

}

export const userStateReducer = function (state = initial_user_state, action) {
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
      return _.extend({}, state, { password_request: 'sending', email_recipient: payload })
      break
    }

    case PASSWORD_REQUEST_SENT: {
      return _.extend({}, state, { password_request: 'sent', email_recipient: payload })
      break
    }

    case PASSWORD_REQUEST_FAILED: {
      return _.extend({}, state, { password_request: 'failed' })
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

    case UPDATE_USER: {
      return _.extend({}, state, { error_updating_user: false })
    }

    case ERROR_DELETING_USER: {
      return _.extend({}, state, { error_deleting_user: true})
      break
    }

    case DELETE_USER: {
      return _.extend({}, state, { error_deleting_user: false})
    }
  }

  return state
}

const user = state => state.user
const userState = state => state.userState
const util = state => state.util

export const selector = createStructuredSelector({
  user,
  userState,
  util
})
