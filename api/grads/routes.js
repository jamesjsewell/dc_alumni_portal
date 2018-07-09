const express = require("express"),
    gradController = require("./grad_controller.js"),
    gradRoutes = express.Router()


	passport = require("passport"),
	passportService = require("./config/passportConfig.js")

// middleware to require login/auth
const requireAuth = passport.authenticate("jwt", { session: false })
const requireLogin = passport.authenticate("local", { session: false })

//gradRoutes.post("/grads", gradController.register)
gradRoutes.post("/grads/filter", gradController.get)
gradRoutes.get("/grads/:id", gradController.get)
gradRoutes.get("/grads", gradController.get)
gradRoutes.put("/grads/:id", requireAuth, gradController.update)
gradRoutes.delete("/grads/:id", requireAuth, gradController.delete)

//authentication
gradRoutes.post("/grad/register", gradController.register)
gradRoutes.post("/grad/login", requireLogin, gradController.login)
gradRoutes.post("/grad/forgot-password", requireAuth, gradController.forgotPassword)
gradRoutes.post("/grad/reset-password/:token", requireAuth, gradController.changePassword)
gradRoutes.get("/grad/authenticate", requireAuth, (req, res) => {
	res.send({ authenticated: true })
})

module.exports = gradRoutes
