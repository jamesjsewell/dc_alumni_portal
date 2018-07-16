
import { createStructuredSelector } from "reselect"
import { auto_log_in, authenticate } from "./features/user_auth/user.js"
export { auto_log_in, authenticate }

const user = state => state.user



export const selector = createStructuredSelector({
	user
})


