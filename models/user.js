// Dependencies
var mongoose = require('mongoose');

// Schema
var userSchema = new mongoose.Schema({
    id: String,
    token: String,
    email: String,
    name: String
});

// Return model
module.exports = mongoose.model('User', userSchema);
