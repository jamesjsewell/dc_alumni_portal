import { createStructuredSelector } from "reselect"

const user = state => state.user

export const selector = createStructuredSelector({
    user
})