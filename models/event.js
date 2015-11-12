
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var eventSchema = new mongoose.Schema({
    titre: String,
    sku: String,
    id: Number
});

// Return model
module.exports = restful.model('Events', eventSchema);