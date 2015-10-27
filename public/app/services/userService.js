angular.module('userService', [])

.factory('User', function($http){
  //create a new object
  var userFactory = {};

/*note if your api is hosted on seperate server you need to prefix '/api/'' URLS with your server like 'http//example.com/api/users' */

  //get a single user
  userFactory.get = function(id) {
    return $http.get('/api/users/' + id);
  };

  //get all users
  userFactory.all = function() {
    return $http.get('/api/users/');
  };

  //create a user
  userFactory.create = function(userData) {
    return $http.post('/api/users/', userData);
  };

  //edit a user
  userFactory.update = function(id, userData) {
    return $http.put('/api/users/' + id, userData);
  }

  //delete a user
  userFactory.delete = function(id) {
    return $http.delete('/api/users/' + id);
  };

  return userFactory;
});