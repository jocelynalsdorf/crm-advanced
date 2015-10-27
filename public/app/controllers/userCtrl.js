angular.module('userCtrl', ['userService'])

.controller('userController', function(User){
  var vm = this;

  //set a processing variable to show loading things
  vm.processing = true;

  User.all()
    .success(function(data){
      //when all users come back remove the processing var
      vm.processing = false;

      //bind the users that come back to vm.users
      vm.users = data;
    });
})