
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Events = require('../models/event');
var Chokes = require('../models/choke');

// Routes
Events.methods(['get', 'put', 'post', 'delete']);
Events.register(router, '/events');
Chokes.methods(['get', 'put', 'post', 'delete']);
Chokes.register(router, '/chokes');

// Return router
module.exports = router;