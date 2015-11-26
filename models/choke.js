
// Dependencies
var mongoose = require('mongoose');

// Schema
var chokeSchema = new mongoose.Schema({
    fbSender: String,
    fbReceiver: String,
    event: String,
    answered : Boolean,
    response : Boolean
});

// Return model
module.exports = mongoose.model('Choke', chokeSchema);
