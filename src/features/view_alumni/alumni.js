import _ from "underscore"
import { combineReducers } from "redux"
import { createStructuredSelector } from "reselect"


// reducers
const UPDATE_ITEM_COLLECTION = "update_item_collection",
    EDIT_ITEM = "edit_item",
    MESSAGE = "message",
    ASYNC = "aysnc"

const initial_state = {

    is_selected: null,
    editing: null,
    message: null,
    collection: null,
    model: null,
    array: null

}

export const itemsReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

        case UPDATE_ITEM_COLLECTION: {

            return _.extend({}, state, {collection: payload.collection, array: payload.array, editing: false })
            break

        }

        case EDIT_ITEM: {

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

const items = state => state.items

export const selector = createStructuredSelector({
    items
})
