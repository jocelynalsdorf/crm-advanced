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
  });
 
  //get rid of the hash in url
  $locationProvider.html5Mode(true);
  
});