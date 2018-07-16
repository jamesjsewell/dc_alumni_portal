import _ from "underscore"
import axios from "axios"
import { createStructuredSelector } from "reselect"
import { API_URL } from "../util/util.js"


const initial_state = {


}

export const alumniReducer = function(state = initial_state, action) {

    var payload = action.payload

    switch (action.type) {

        case "placeholder": {
		
            return _.extend({}, state, { })
            break

		}

    }

    return state
}

const user = state => state.user

export const selector = createStructuredSelector({
    user
})