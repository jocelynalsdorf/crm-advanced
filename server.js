//Base Setup
//===========================

//Call the packages

var express = require('express'); //call express
var app = express(); //define app using express
var User = require('./app/models/user'); //pull in our UserSchema model
var bodyParser = require('body-parser');//get body-parser
var morgan = require('morgan'); //used to see requests
var mongoose = require('mongoose') //used to connect to database
var port = process.env.PORT || 8080; //set the port for the app

//APP CONFIGURATION ===========
//middleware
//use body parser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure our app to handle CORS requests 

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-COntrol-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

//Routes for API ===============

//basic route for home page

app.get('/', function(req, res){
  res.send('Welcome to the home page');
});

//get an instance of the express router to use as a base route

var apiRouter = express.Router();

//test route to make sure everything is working
//access: GET http://ocalhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({message: 'Hoorray! Welcome to our api'});
});

//more routes for api will go here

//Register routes ===============
//all of these routes will be prefixed with /api

app.use('/api', apiRouter);

//start the server ==============
app.listen(port);
console.log('Magic happens on port ' + port);

//connect to database 

mongoose.connect('mongodb://project1:project1@apollo.modulusmongo.net:27017/U2xysiro');






