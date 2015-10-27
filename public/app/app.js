angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService'
  ])

//application configuration to integrate token into requests
.config(function($httpProvider){
  //attach our auth interceptor to the http request
  //the http provider attaches the token to reach request
  $httpProvider.interceptors.push('AuthInterceptor');
});