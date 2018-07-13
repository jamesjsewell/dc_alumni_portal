const { ROLE_USER, ROLE_OWNER, ROLE_ADMIN } = require("../users/config/roles.js")

const getRole = function getRole(checkRole) {
    let role

    switch (checkRole) {
        case ROLE_ADMIN:
            role = 4
            break
        case ROLE_OWNER:
            role = 3
            break
        case ROLE_USER:
            role = 2
            break
        default:
            role = 1
    }

    return role
}

module.exports = {
    getRole: getRole
}