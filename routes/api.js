
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Evenements = require('../models/evenement');

// Routes
Evenements.methods(['get', 'put', 'post', 'delete']);
Evenements.register(router, '/evenements');

// Return router
module.exports = router;