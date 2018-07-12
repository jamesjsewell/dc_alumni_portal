// mongooese model imported from the Grad's schema file
const Grad = require("./schema.js")

const jwt = require("jsonwebtoken")
const crypto = require("crypto")
// const mailchimp = require('../config/mailchimp');

const getRole = require("../util/getRole.js").getRole
const nodemailer = require("nodemailer")
const _ = require("underscore");

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(grad) {
    return jwt.sign(grad, process.env.AUTH_SECRET, {
        expiresIn: 604800 // in seconds
    })
}

// see file for more info
const errorHandler = require("./on_error.js").error,
    successHandler = require("./on_success.js").success


// exports the functions as methods that are the 'endpoints' of routes, where logic gets handled and 
// the output of the method is returned over http as json or any other variable specified. the contents of the response are
// returned back to where you made the http request
// these functions are utilized in the GradRoutes.js file
module.exports = {

    // returns a collection of all 'Grad' records in the database, or a filtered set
    // of records if specified. The results of the query are returned in an http response back to
    // where the http request was initiated
    get: function (req, res, next) {

        // builds a json object of key value pairs
        // if the json object ends up with key/value pairs
        // they will be used to filter for 'Grad' records 
        // that have matching parameters
        var queryObj = req.body
     
        if (req.params.id) {
            queryObj._id = req.params.id

        }

        // if the queryObj variable doesnt have any values assigned to it
        // the find method will return all 'Grad' records in a collection.
        // if it does have values assigned to it, the method will only 
        // return records that have matching parameters

        // Grad is a mongoose model class that contains a method called find. Find takes
        // a query object if you specifiy one, if the object is empty it will returned
        // an unfiltered collection of records, otherwise it will return a filtered set
        Grad.find(queryObj, "-password",  function (err, results) {
            //returns an 'error' message over an http response to the entity where the http request was made
            if (err) {

                var message = "server error, Grad not found"
                return errorHandler(req, res, message, err)
                

            }

            //returns the results of the query over an http response to the entity where the http request was made
            return successHandler(req, res, message, results)
        })

    },

    // this method will take the id of the desired grad from the request
    // parameters. it will then perform a 'find by id and update' function, using the new data obtained
    // from the 'body' of the request. When that is complete, it sends the newly updated record back
    // as a response to the entity that made the http put request.
    update: function (req, res, next) {

        // the Grad is a mongoose model class, which contains a method called findByIdAndUpdate, 
        // the method takes an id and the new information that you want to be patched on the record
        // it then returns the result with either an error or the updated object

        const gradId = req.params.id;

        if (req.grad._id.toString() !== gradId) {
            return res.status(401).json({
                error: "You are not authorized to update this grad profile."
            });
        }

        Grad.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true},
            function (err, results) {
                if (err) {
                    // if there was an error, this will send the error as an http response to the request that was made
                    var message = "server error, could not update Grad"
                    return errorHandler(req, res, message, err)

                } else if (!results) {
                    // if it could not find the record, sends an error message as a response over http back to where the request was made
                    var message = "server error, Grad not found"
                    return errorHandler(req, res, message, err)

                } else {
                    // sends the newly updated record over http request back to where the request was made
                    var message = "Grad updated"
                    return successHandler(req, res, message, results)

                }
            }
        )
    },

    // takes the desired Grad's id from the request parameters, then performs a method that the selects the record in the database
    // and removes it
    delete: function (req, res, next) {

        // Grad is a mongoose model class that contains a method called remove. remove takes the id that was sent
        // in the http request parameters. If a record can be found that has the desired id, it will be removed
        // from the database collection

        Grad.remove({ _id: req.params.id }, function (err) {
            if (err) {
                // if an error occures in the process of selecting or removing the record, the error will be sent
                // back over an http response to where the http request was made
                var message = "server error, could not remove Grad"
                return errorHandler(req, res, message, err)
                
            }

            // if the record was found and removed, a confirmation message will be sent back as an http response to where the request was made
            var message = "Grad deleted"
            //return successHandler(req, res, message)
            return res.status(201).json({id: req.params.id})
        })

    },

    authenticate: function(req, res, next){

        var id = req.params._id

        Grad.findById(id, (err, gradExisting) => {
          
            if (err) {
                return next(err)
            }

            if (gradExisting) {

                var gradMinusPassword = _.omit(gradExisting.toObject(), 'password')
                res.status(200).json({
                    grad: gradMinusPassword
                })
                
            }
            else{
                res.status(401).json({ error: "grad doesn't exist"})

            }

        })

    },

    login: function(req, res, next) {
    
      
        Grad.findOne({ email: req.body.email }, (err, gradExisting) => {
          
            if (err) {
                return next(err)
            }

            if (gradExisting) {

                var gradMinusPassword = _.omit(gradExisting.toObject(), 'password')
                res.status(200).json({
                    grad_token: `JWT ${generateToken(gradMinusPassword)}`,
                    grad: gradMinusPassword
                })
                
            }
            else{
                res.status(401).json({ error: "grad doesn't exist"})

            }

        })

    },

    register: function(req, res, next) {
        // Check for registration errors
        const { email, fname, lname, password } = req.body
    
        // Return error if no email provided
        if (!email) {
            return res
                .status(422)
                .send({ error: "You must enter an email address." })
        }
    
        // Return error if no password provided
        if (!password) {
            return res.status(422).send({ error: "You must enter a password." })
        }
    
        Grad.findOne({ email }, (err, gradExisting) => {
            if (err) {
                return next(err)
            }
    
            // If user is not unique, return error
            if (gradExisting) {
                return res
                    .status(422)
                    .send({ error: "That email address is already in use." })
            }
    
            // If email is unique and password was provided, create account
            const grad = new Grad({
                email: email,
                password: password,
                fname: fname, 
                lname: lname 
            })
           
            grad.save((err, savedGrad) => {
                
                if (err) {
                    return next(err)
                }

    
                // Respond with JWT if user was created

                var gradMinusPassword = _.omit(savedGrad.toObject(), 'password')
                
                res.status(201).json({
                    grad_token: `JWT ${generateToken(gradMinusPassword)}`,
                    grad: gradMinusPassword
                })
            })
        })
    },

    roleAuthorization: function(requiredRole) {
        return function(req, res, next) {
            const grad = req.grad
    
            Grad.findById(grad._id, (err, foundGrad) => {
                if (err) {
                    res.status(422).json({ error: "No user was found." })
                    return next(err)
                }
    
                // If user is found, check role.
                if (getRole(foundGrad.role) >= getRole(requiredRole)) {
                    return next()
                }
    
                return res
                    .status(401)
                    .json({ error: "You are not authorized to view this content." })
            })
        }
    },

    forgotPassword: function(req, res, next) {
        const email = req.body.email
       
        Grad.findOne({ email }, (err, gradExisting) => {
            // If user is not found, return error
            if (err || gradExisting == null) {
                console.log(err, gradExisting)
                res.status(422).json({
                    error: "Your request could not be processed as entered. Please try again."
                })
                return next(err)
            }
    
            // If user is found, generate and save resetToken
    
            // Generate a token with Crypto
            crypto.randomBytes(48, (err, buffer) => {
                const resetToken = buffer.toString("hex")
                if (err) {
                    return next(err)
                }
    
                gradExisting.resetPasswordToken = resetToken
                gradExisting.resetPasswordExpires = Date.now() + 3600000 // 1 hour
    
                gradExisting.save(err => {
                    // If error in saving token, return it
                    if (err) {
                        console.log(err)
                        return next(err)
                    }
    
                    const message = {
                        body: `${"You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" + "Please click on the following link, or paste this into your browser to complete the process:\n\n" + "http://"}${req.headers.host}/reset-password/${resetToken}\n\n` +
                            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
                    }
    
                    const nodemailer = require("nodemailer")
    
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        port: 25,
                        secure: false, // secure:true for port 465, secure:false for port 587
                        auth: {
                            user: process.env.NODEMAILER_USERNAME,
                            pass: process.env.NODEMAILER_PASSWORD
                        }
                    })
    
                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: process.env.NODEMAILER_USERNAME, // sender address
                        to: gradExisting.email, // list of receivers
                        subject: "reset password", // Subject line
                        text: message.body,
                        html: "" // html body
                    }
    
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error)
                        }
                        console.log(
                            "Message %s sent: %s",
                            info.messageId,
                            info.response
                        )
                    })
    
                    return res.status(200).json({
                        message: "Please check your email for the link to reset your password."
                    })
                })
            })
        })
    },

    changePassword: function(req, res, next) {
        
        Grad.findOne(
            {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: { $gt: Date.now() }
            },
            (err, grad) => {
                // If query returned no results, token expired or was invalid. Return error.
                if (!grad) {
                    res.status(422).json({
                        error: "Your token has expired. Please request to reset your password again."
                    })
    
                    return next()
                }
    
                // Otherwise, save new password and clear resetToken from database
                grad.password = req.body.password
                grad.resetPasswordToken = undefined
                grad.resetPasswordExpires = undefined
    
                grad.save(err => {
                    if (err) {
                        return next(err)
                    }
    
                    // If password change saved successfully, alert user via email
                    const message = {
                        subject: "Password Changed",
                        text: "You are receiving this email because you changed your password. \n\n" +
                            "If you did not request this change, please contact us immediately."
                    }
    
                    // Otherwise, send user email confirmation of password change via Mailgun
                    //mailgun.sendEmail(grad.email, message)
    
                    return res.status(200).json({
                        message: "Password changed successfully. Please login with your new password.",
                        didReset: true
                    })
                })
            }
        )
    }
}

