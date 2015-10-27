//Base Setup
//===========================

//Call the packages

var express = require('express'); //call express
var app = express(); //define app using express
var bodyParser = require('body-parser');//get body-parser
var morgan = require('morgan'); //used to see requests
var mongoose = require('mongoose') //used to connect to database
var config = require('./config');
var path = require('path');
//see if this helps
var jwt = require('jsonwebtoken');

//APP CONFIGURATION ===========
//
//use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure our app to handle CORS requests 

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

//connect to database 
mongoose.connect(config.database);

//set staic files location; used for requests that frontend makes

app.use(express.static(__dirname + '/public'));

//Routes for API ===============

//get an instance of the express router to use as a base route
var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api', apiRoutes);



//basic catchall route for angular to handle that sends users to frontend -has to be after api routes
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//start the server ==============
app.listen(config.port);
console.log('Magic happens on port ' + config.port);








