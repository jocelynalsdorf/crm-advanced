angular.module('userCtrl', ['userService'])

.controller('userController', function(User){
  var vm = this;

  //set a processing variable to show loading things
  vm.processing = true;

  vm.deleteUser =function(id) {
    vm.processing = true;
    //accepts the user id as a parameter
    User.delete(id)
      .success(function(data){
        //get all users to update the table and set up the api to return a list of users with the delete call
        User.all()
          .success(function(data){
            vm.processing = false;
            vm.users = data;
          });
      });
  };

  User.all()
    .success(function(data){
      //when all users come back remove the processing var
      vm.processing = false;

      //bind the users that come back to vm.users
      vm.users = data;
    });
})

.controller('userCreateController', function(User){
  var vm = this;
  //variable to hide/show elements of the view and differntiates between create or edit pages
  vm.type = 'create';
  //function to create  a user
  vm.saveUser = function() {
    vm.processing = true;

    //clear the messages
    vm.message = '';

    //use create function in the userService
    User.create(vm.userData) 
      .success(function(data){
        vm.processing = false;
        //clear the form
        vm.userData = {};
        vm.message = data.message;
      });
  };

});











