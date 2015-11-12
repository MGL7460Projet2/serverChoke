
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var chokeSchema = new mongoose.Schema({
    titre: String,
    sku: String,
    id: Number
});

// Return model
module.exports = restful.model('Chokes', chokeSchema);