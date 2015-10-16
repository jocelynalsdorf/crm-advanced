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

//middleware to use for all requests
apiRouter.use(function(req, res, next){
  //do logging here
  console.log('Somebody just came to my app');

  //here is where I will add more middleware and authenticate users
  ////call next so it goes to next peive of middleware
  next();
});



//test route to make sure everything is working
//access: GET http://localhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({message: 'Hoorray! Welcome to our api'});
});

//more routes for api will go here

//Register routes ===============
//all of these routes will be prefixed with /api

//routes that end in /users========
apiRouter.route('/users')
  .post(function(req,res){
    //create new instance of user model
    var user = new User();
    //set the users info that comes from the request
    user.name = req.body.name;
    user.username = req.body.username;
    user.password =  req.body.password;
    //save the user and look for any errors
    user.save(function(err){
      if(err) {
        //if duplicate
        if (err.code == 11000)
          return res.json({success: false, message: 'A user with that name already exists'});
        else 
          return res.send(err);
      }

      res.json({message: 'User created'});
    });
  })
  //get all the users from /api/users
  .get(function(req,res){
    User.find(function(err, users){
      if(err) res.send(err);

      //return the users
      res.json(users);
    });
  });


app.use('/api', apiRouter);

//start the server ==============
app.listen(port);
console.log('Magic happens on port ' + port);

//connect to database 

mongoose.connect('mongodb://project1:project1@apollo.modulusmongo.net:27017/U2xysiro');






