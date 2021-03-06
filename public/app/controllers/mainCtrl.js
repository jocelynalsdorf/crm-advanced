angular.module('mainCtrl', ['authService', 'userService'])

.controller('mainController', function($rootScope, $location, Auth, AuthToken) {
  var vm = this;


  //get info if a person is logged
  vm.loggedIn = Auth.isLoggedIn();

  //check to see if a user is logged in on every request
  $rootScope.$on('$routeChangeStart', function() {
    vm.loggedIn = Auth.isLoggedIn();

    //get user info on a route change
    Auth.getUser()
      .success(function(data){
        vm.user = data;
      });
  });

  //function to handle login form
  vm.doLogin = function() {
    //for processing icon
    vm.processing = true;
    //clear the error
     vm.error = '';
    //call the Auth.login() function
    Auth.login(vm.loginData.username, vm.loginData.password)
    .success(function(data){
      vm.processing = false;
      if(data.success)
      //if a user succesfully logs in redirect to users page
      $location.path('/users');
      else
        vm.error = data.message;
    });
  };

  //function to handle logging out
  vm.doLogout = function() {
    Auth.logout();
    //reset all user info
    vm.user = {};
    $location.path('/login');
  };
});