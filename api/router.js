const express = require('express')

// initializes main express router
const apiRoutes = express.Router()

// import api sub-routes
const userRoutes = require('./users/routes.js')

// tells main express router to use subroutes
apiRoutes.use('', userRoutes)

// exports api routes to the main server file
module.exports = apiRoutes
