const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

// mongoose schema class
const Schema = mongoose.Schema

// Importing Node packages required for schema
const { ROLE_USER, ROLE_OWNER, ROLE_ADMIN } = require("./config/roles")

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: true 
        },
        account_type: { type: String },
        fname: { type: String },
        lname: { type: String },
        bio: { type: String, default: null },
        avatar: { type: String, default: null },
        resume: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        website: { type: String, default: null },
        github: { type: String, default: null },
        linkedin: { type: String, default: null },
        stackOverflow: { type: String, default: null },
        mediumBlog: { type: String, default: null },
        portfolio: { type: String, default: null },
        publicEmail: { type: String },
        skills: [{type: String}],
        willingnessToRelocate: { type: Boolean, default: null },
        DCgraduationDate: { type: Date, default: null },
        DCprogramType: { type: String, default: null },
        companyName: { type: String },
        companyURL: { type: String },
        role: {
            type: String,
            enum: [ROLE_USER, ROLE_OWNER, ROLE_ADMIN],
            default: ROLE_USER
        },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

//ORM methods

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre("save", function(next) {
    const user = this, SALT_FACTOR = 5;
    
    if (!user.isModified("password")) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });

    //next()
});

// Method to compare password for login, cb stands for callback
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

// exports mongoose model to the userController.js file
module.exports = mongoose.model("User", UserSchema)