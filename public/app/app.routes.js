angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

  $routeProvider
  //home page route
  .when('/', {
    templateUrl: 'app/views/pages/home.html'
  })
  //login page
  .when('/login', {
    templateUrl: 'app/views/pages/login.html',
    controller: 'mainController',
    controllerAs: 'login'
  })
//show all users
  .when('/users', {
    templateUrl: 'app/views/pages/users/all.html',
    controller: 'userController',
    controllerAs: 'user'
  })
  .when('/users/create', {
    templateUrl: 'app/views/pages/users/single.html',
    controller: 'userCreateController',
    controllerAs: 'user'

  })

  //get rid of the hash in url
  $locationProvider.html5Mode(true);
  
});