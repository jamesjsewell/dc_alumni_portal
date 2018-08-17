// mongooese model imported from the User's schema file
const User = require('./schema.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail')

const getRole = require('../util/getRole.js').getRole
const _ = require('underscore')

// Generate JWT
// TO-DO Add issuer and audience
function generateToken (user) {
  return jwt.sign(user, process.env.AUTH_SECRET, {
    expiresIn: 604800 // in seconds
  })
}

// exports the functions as methods that are the 'endpoints' of routes, where logic gets handled and
// the output of the method is returned over http as json or any other variable specified. the contents of the response are
// returned back to where you made the http request
// these functions are utilized in the UserRoutes.js file
module.exports = {

  // returns a collection of all 'User' records in the database, or a filtered set
  // of records if specified. The results of the query are returned in an http response back to
  // where the http request was initiated
  get: function (req, res, next) {
    // builds a json object of key value pairs
    // if the json object ends up with key/value pairs
    // they will be used to filter for 'User' records
    // that have matching parameters
    var queryObj = req.body

    if (req.params.id) {
      queryObj._id = req.params.id
    }

    // if the queryObj variable doesnt have any values assigned to it
    // the find method will return all 'User' records in a collection.
    // if it does have values assigned to it, the method will only
    // return records that have matching parameters

    // User is a mongoose model class that contains a method called find. Find takes
    // a query object if you specifiy one, if the object is empty it will returned
    // an unfiltered collection of records, otherwise it will return a filtered set
    User.find(queryObj, '-password', function (err, results) {
      // returns an 'error' message over an http response to the entity where the http request was made
      if (err) {
        var message = 'server error, User not found'

        return res.json({error: true, message: message, info: err})
      }

      // returns the results of the query over an http response to the entity where the http request was made
      return res.status(201).json(results)
    })
  },

  // this method will take the id of the desired user from the request
  // parameters. it will then perform a 'find by id and update' function, using the new data obtained
  // from the 'body' of the request. When that is complete, it sends the newly updated record back
  // as a response to the entity that made the http put request.
  update: function (req, res, next) {
    // the User is a mongoose model class, which contains a method called findByIdAndUpdate,
    // the method takes an id and the new information that you want to be patched on the record
    // it then returns the result with either an error or the updated object

    const userId = req.params.id

    if (req.user._id.toString() !== userId) {
      return res.status(401).json({
        error: 'You are not authorized to update this user profile.'
      })
    }

    var inputMinusPassword = _.omit(req.body, 'password')

    User.findByIdAndUpdate(
      { _id: req.params.id },
      inputMinusPassword,
      {new: true},
      function (err, updated) {
        var updatedMinusPassword = _.omit(updated.toObject(), 'password')

        if (err) {
          // if there was an error, this will send the error as an http response to the request that was made
          var message = 'server error, could not update User'
          return res.json({error: true, message: message, info: err})
        } else if (!updated) {
          // if it could not find the record, sends an error message as a response over http back to where the request was made
          var message = 'server error, User not found'
          return res.json({error: true, message: message, info: err})
        } else {
          // sends the newly updated record over http request back to where the request was made
          var message = 'User updated'
          return res.status(200).json({user: updatedMinusPassword})
        }
      }
    )
  },

  // takes the desired User's id from the request parameters, then performs a method that the selects the record in the database
  // and removes it
  delete: function (req, res, next) {
    // User is a mongoose model class that contains a method called remove. remove takes the id that was sent
    // in the http request parameters. If a record can be found that has the desired id, it will be removed
    // from the database collection

    User.remove({ _id: req.params.id }, function (err) {
      if (err) {
        // if an error occures in the process of selecting or removing the record, the error will be sent
        // back over an http response to where the http request was made
        var message = 'server error, could not remove User'
        return res.json({error: true, message: message, info: err})
      }

      // if the record was found and removed, a confirmation message will be sent back as an http response to where the request was made
      var message = 'User deleted'

      return res.status(201).json({id: req.params.id})
    })
  },

  authenticate: function (req, res, next) {
    var id = req.params._id

    User.findById(id, (err, userExisting) => {
      if (err) {
        return next(err)
      }

      if (userExisting) {
        var userMinusPassword = _.omit(userExisting.toObject(), 'password')
        res.status(200).json({
          user: userMinusPassword
        })
      } else {
        res.status(200).json({ error: "user with those credentials doesn't exist"})
      }
    })
  },

  login: function (req, res, next) {
    User.findOne({ email: req.body.email }, (err, userExisting) => {
      if (err) {
        return next(err)
      }

      if (userExisting) {
        var userMinusPassword = _.omit(userExisting.toObject(), 'password')
        res.status(200).json({
          dc_user_token: `JWT ${generateToken(userMinusPassword)}`,
          user: userMinusPassword
        })
      } else {
        res.status(200).json({ error: "user with those credentials doesn't exist"})
      }
    })
  },

  register: function (req, res, next) {
    // Check for registration errors
    const { email, fname, lname, password } = req.body

    // Return error if no email provided
    if (!email) {
      return res
        .status(422)
        .send({ error: 'You must enter an email address.' })
    }

    // Return error if no password provided
    if (!password) {
      return res.status(422).send({ error: 'You must enter a password.' })
    }

    User.findOne({ email }, (err, userExisting) => {
      if (err) {
        return next(err)
      }

      // If user is not unique, return error
      if (userExisting) {
        return res
          .status(200)
          .send({ error: 'That email address is already in use.' })
      }

      // If email is unique and password was provided, create account
      const user = new User(req.body)

      user.save((err, savedUser) => {
        if (err) {
          return next(err)
        }

        // Respond with JWT if user was created
        var userMinusPassword = _.omit(savedUser.toObject(), 'password')

        res.status(201).json({
          dc_user_token: `JWT ${generateToken(userMinusPassword)}`,
          user: userMinusPassword
        })
      })
    })
  },

  roleAuthorization: function (requiredRole) {
    return function (req, res, next) {
      const user = req.user

      User.findById(user._id, (err, foundUser) => {
        if (err) {
          res.status(422).json({ error: 'No user was found.' })
          return next(err)
        }

        // If user is found, check role.
        if (getRole(foundUser.role) >= getRole(requiredRole)) {
          return next()
        }

        return res
          .status(401)
          .json({ error: 'You are not authorized to view this content.' })
      })
    }
  },

  forgotPassword: function (req, res, next) {
    const email = req.body.email

    User.findOne({ email }, (err, userExisting) => {
      // If user is not found, return error
      if (err || userExisting == null) {
        res.status(422).json({
          error: 'Your request could not be processed as entered. Please try again.'
        })
        return next(err)
      }

      // If user is found, generate and save resetToken

      // Generate a token with Crypto
      crypto.randomBytes(48, (err, buffer) => {
        const resetToken = buffer.toString('hex')
        if (err) {
          return next(err)
        }

        userExisting.resetPasswordToken = resetToken
        userExisting.resetPasswordExpires = Date.now() + 3600000 // 1 hour

        userExisting.save(err => {
          // If error in saving token, return it
          if (err) {
            return next(err)
          }

          const message = {
            body: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'}${process.env.CLIENT_URL}/reset-password/${resetToken}\n\n` +
                            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
          }

          // using SendGrid's v3 Node.js Library
          // https://github.com/sendgrid/sendgrid-nodejs
          sgMail.setApiKey(process.env.SENDGRID_API_KEY)
          const msg = {
            to: userExisting.email,
            from: 'alumni_portal@digitalcrafts.com',
            subject: 'Reset Password',
            text: message.body
            // html: '<p>and easy to do anywhere, even with Node.js</p>'
          }

          sgMail.send(msg).then((response) => {
            return res.status(200).json({
              message: 'Please check your email for the link to reset your password.'
            })
          }).catch((error) => {
            return res.status(422).json({
              error: 'there was an error sending the email'
            })
          })

          return res.status(200).json({
            message: 'Please check your email for the link to reset your password.'
          })
        })
      })
    })
  },

  changePassword: function (req, res, next) {
    const the_email = req.body.email

    User.findOne(
      {
        email: the_email
      },
      (err, user) => {
        // If query returned no results, token expired or was invalid. Return error.
        if (!user) {
          res.status(422).json({
            error: 'an account could not be found with that email, try correcting the email'
          })

          return next()
        }

        if (user.resetPasswordToken != req.params.token || user.resetPasswordExpires != { $gt: Date.now() }) {
          res.status(422).json({
            error: 'Your token has expired. Please request to reset your password again.'
          })

          return next()
        }

        // Otherwise, save new password and clear resetToken from database
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        user.save(err => {
          if (err) {
            return next(err)
          }

          // If password change saved successfully, alert user via email
          const message = {
            subject: 'Password Changed',
            text: 'You are receiving this email because you changed your password. \n\n' +
                            'If you did not request this change, please contact us immediately.'
          }

          // Otherwise, send user email confirmation of password change via Mailgun
          // mailgun.sendEmail(user.email, message)

          var userMinusPassword = _.omit(user.toObject(), 'password')

          return res.status(200).json({
            message: 'Password changed successfully. Please login with your new password.',
            didReset: true,
            user: userMinusPassword,
            dc_user_token: `JWT ${generateToken(userMinusPassword)}`
          })
        })
      }
    )
  }
}
