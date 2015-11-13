
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var eventSchema = new mongoose.Schema({
    name: String,
    face: String,
    lastText: String
});

// Return model
module.exports = restful.model('Events', eventSchema);