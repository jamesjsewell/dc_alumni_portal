const express = require('express'),
  userController = require('./user_controller.js'),
  userRoutes = express.Router()

passport = require('passport'),
passportService = require('./config/passportConfig.js')

// middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false })
const requireLogin = passport.authenticate('local', { session: false })

userRoutes.post('/users/filter', userController.get)
userRoutes.get('/users/:id', userController.get)
userRoutes.get('/users', userController.get)

userRoutes.post('/user/register', userController.register)
userRoutes.post('/user/login', requireLogin, userController.login)
userRoutes.post('/user/forgot-password', userController.forgotPassword)
userRoutes.post('/user/reset-password/:token', userController.changePassword)
userRoutes.get('/user/authenticate/:_id', requireAuth, userController.authenticate)
userRoutes.put('/user/:id', requireAuth, userController.update)
userRoutes.delete('/user/:id', requireAuth, userController.delete)

module.exports = userRoutes
