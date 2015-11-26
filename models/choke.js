
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var chokeSchema = new mongoose.Schema({
    fbSender: String,
    fbReceiver: String,
    event: String,
    answered : Boolean,
    response : Boolean
});

// Return model
module.exports = restful.model('Chokes', chokeSchema);
