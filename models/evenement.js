
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var evenementSchema = new mongoose.Schema({
    titre: String,
    sku: String,
    id: Number
});

// Return model
module.exports = restful.model('Evenements', evenementSchema);