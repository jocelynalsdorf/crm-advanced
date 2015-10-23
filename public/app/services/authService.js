angular.module('authService', [])

//=======
//auth factory to login and get information
//inject $http for communicating with the API
//inject $q to return promise objects
//inject AuthToken to manage tokens
//=======

.factory('Auth', function($http, $q, AuthToken){
//create auth factory object

  var authFactory = {};

  //handle login
  

  //handle logout
  
  //check is user is logged in
  
  //get the user info
  
  //return factory object
  return authFactory;

})
//========
//factory for handling tokens
//inject $window to store token client-side
//========

.factory('AuthToken', function($window){
  var authTokenFactory = {};

  //get the token
  //set the token or clear the token
  return authTokenFactory;
})

//======
//application configuration to integrate token into requests
//======

.factory('AuthInterceptor', function($g, AuthToken){
  var interceptorFactory = {};

  //attach the token to every request
  
  //redirect if a token doesnt authenticate
  
  return interceptorFactory;

})




