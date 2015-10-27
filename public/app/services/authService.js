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
  authFactory.login = function(username, password) {
    //return the promise object and its data
    return $http.post('/api/authenticate', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    });
  };

  //handle logout by clearing the token
    authFactory.logout = function() {
      //clear the token
      AuthToken.setToken();
    };
  
  //check is user is logged in, checks for a local token
  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken())
      return true;
    else
      return false;
  };
  
  //get the loggedin user info
  authFactory.getUser = function() {
    if (AuthToken.getToken())
      return $http.get('/api/me', {cache: true});
    else
      return $q.reject({message: 'User has no token'});
  };

  //return factory object
  return authFactory;

})


//========
//factory for handling tokens
//inject $window to store token client-side
//========

.factory('AuthToken', function($window){
  var authTokenFactory = {};

  //get the token out of local storage
  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };

  //set the token if passed or clear the token if no token
  authTokenFactory.setToken = function(){
    if(token)
      $window.localStorage.setItem('token', token);
    else
      $window.localStorage.removeItem('token');
  };

  //return factory
  return authTokenFactory;
})


//======
//application configuration to integrate token into requests
//======

.factory('AuthInterceptor', function($q, $location, AuthToken){
  var interceptorFactory = {};

  //attach the token to every http request
  interceptorFactory.request = function(config){
    //grab the token
    var token = AuthToken.getToken();
    if(token)
      config.headers['x-access-token'] = token;
    return config;
  };

  //happens if response errors
  interceptorFactory.responseError = function(response) {
    //if server returns a 403
    if (response.status == 403) {
      AuthToken.setToken();
      $location.path('/login');
    }
    //return the errors from the server as a promise
    return $q.reject(response);
  };

  return interceptorFactory;

  

});




