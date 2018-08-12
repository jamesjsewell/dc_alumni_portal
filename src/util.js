import _ from "underscore"

import { createStructuredSelector } from "reselect"

const ASYNC = "aysnc"
	
const initial_state = { asyncActive: false }


export function setAsync(status) {
	
	return function(dispatch){

		dispatch({type: ASYNC, payload: { async: status }})
	}
}

export const utilReducer = function(state = initial_state, action) {

    var payload = action.payload
  
    switch (action.type) {

        case ASYNC: {
		
            return _.extend({}, state, { asyncActive: payload.async })
            break

		}

    }

    return state

}

const util = state => state.util

export const selector = createStructuredSelector({
    util
})