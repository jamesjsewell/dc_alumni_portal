const mongoose = require("mongoose")

// mongoose schema class
const Schema = mongoose.Schema

// instance of mongoose Schema class 
var Grad = new Schema({
    username: { type: String },
    bio: { type: String }
}, { collection: 'alumni', timestamps: true })

// exports mongoose model to the gradController.js file
module.exports = mongoose.model("Grad", Grad)