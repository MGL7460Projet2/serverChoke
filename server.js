
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/rest_test');

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log('API is running on port 3000');
