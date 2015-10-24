//when creating new files you need to require() everything that will be neededby the file
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var superSecret = config.secret;

module.exports = function(app, express) {
var apiRouter = express.Router();

//add route for authentication and place BEFORE middleware @ http://localhost:8000/api/authenticate
apiRouter.post('/authenticate', function(req,res){
  console.log(req.body.username);
  //select the password sincemongoose is not returning it by default
  User.findOne({
    username: req.body.username
  }).select('name username password').exec(function(err,user){
    if(err) throw err;
    //if no user is found do this
    if(!user) {
      res.json({
        success: false,
        message: 'Authentication failed. user not found.'
      });
      //is user is found do this
    } else if (user) {
      //check if password matches
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success:false,
          message: 'Authentication failed.wrong password.'
        });
      } else {
        //if user is found and password is right create a token
        var token = jwt.sign(user, superSecret, {
          expiresInMinutes: 1440 //24 hours
        });

        //return the information including token as json
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

//middleware to use to verify a token
apiRouter.use(function(req, res, next){
  console.log('someone just arrived at our app');

  //check header or url parameteres of post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

//decode the token
  if(token) {

    //verify secret and checks expiration
    jwt.verify(token, superSecret, function(err, decoded){
      //create message in callback
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        //if everything is ok, save to request for use in other routes
        req.decoded = decoded;
        //next is now here so that the user only continue on if there is successful authentication
        next();
      }
    });
  } else {
    //if there is no token return an HTTP response of 403(access forbidden) $ error message
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }

});

//test route to make sure everything is working
//access: GET http://localhost:8080/api
apiRouter.get('/', function(req, res){
  res.json({message: 'Hoorray! Welcome to our api'});
});

//adds endpoint to get user information so we can store users info
apiRouter.get('/me', function(req,res){
  res.send(req.decoded);
});

//routes that end in /users access at ========

//create a user
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
      if(err) res.send(err);

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

//routes that end in user/:user_id ==========

apiRouter.route('/users/:user_id')
//get user with the id
  .get(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      //handle any errors
      if (err) res.send(err);
      //return that user if no error is thrown
      res.json(user);
    });
  })
   //update user with this id
  .put(function(req, res){
    User.findById(req.params.user_id, function(err, user){
      //handle the error
      if(err) res.send(err);

      //update user info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;

      //save the user
      user.save(function(err){
        if (err) res.send(err);
        //return a message
        res.json({message: 'User updated'});
      });
    });  
  })
  .delete(function(req,res){
    //delete a user
    User.remove({
      _id: req.params.user_id
    }, function(err, user){
      if(err) return res.send(err);
      res.json({message: 'Successfully deleted'});
    });
  });
  return apiRouter;
};