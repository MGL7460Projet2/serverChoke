// Dependencies
var mongoose = require('mongoose');

// Schema
var userSchema = new mongoose.Schema({
    fbID: String,
    token: String,
    email: String,
    name: String,
    events : Array
});

// Return model
module.exports = mongoose.model('User', userSchema);
