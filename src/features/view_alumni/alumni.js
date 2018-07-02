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
    array: null,
    ajaxPayload: CRUD_payload

}

export function ajax_controller(operation, ajaxPayload) {

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
                payload: { collection: backbone_collection, array: collection.models }
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

        new CRUD(ajaxPayload).create()

    }

}


export const itemsReducer = function(state = initial_state, action) {

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

const grads = state => state.grads
const AJAX_payload = state => state.AJAX_payload

export const selector = createStructuredSelector({
    grads,
    AJAX_payload
})