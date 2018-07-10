// Importing Passport, strategies, and config
const passport = require("passport"),
    Grad = require("../schema.js"),
    jwtSecret = process.env.AUTH_SECRET,
    JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt,
    LocalStrategy = require("passport-local")

// Setting username field to email rather than username
const localOptions = {
    usernameField: "email"
}

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  
    Grad.findOne({ email }, (err, grad) => {
        if (err) {
            return done(err)
        }
        if (!grad) {
            return done(null, false, {
                error: "Your login details could not be verified. Please try again."
            })
        }

        

        grad.comparePassword(password, (err, isMatch) => {
           
            if (err) {
              
                return done(err)
            }
            if (!isMatch) {
               
                return done(null, false, {
                    error: "Your login details could not be verified. Please try again."
                })

            }
           
            return done(null, grad)
        })
    })
})

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    // Telling Passport where to find the secret
    secretOrKey: jwtSecret

    // TO-DO: Add issuer and audience checks
}

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    Grad.findById(payload._id, (err, grad) => {
        if (err) {
            return done(err, false)
        }

        if (grad) {
            done(null, grad)
        } else {
            done(null, false)
        }
    })
})

passport.use(jwtLogin)
passport.use(localLogin)