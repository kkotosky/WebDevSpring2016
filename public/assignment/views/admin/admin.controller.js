"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService) {
        $rootScope.user = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            roles: [],
            currentUpdate : -1
        };
        UserService.findAllUsers().then(function(resp){
            $rootScope.users = resp.data;
        }, handleError);
        $rootScope.removeUser = function(user, index) {
            UserService.deleteUserById(user._id).then(function(resp){
                $rootScope.users.splice(index, 1);
                window.alert('successful delete');
            }, handleError);
        };
        $rootScope.updateUser = function(user) {
            UserService.updateUser(user._id, user).then(function(resp){
                $rootScope.users[$rootScope.currentUpdate] = $rootScope.currentUser;
                $rootScope.currentUpdate = -1;
            }, handleError);
        };
        $rootScope.addUser = function(user) {
            UserService.createUser(user).then(function(resp){
                $rootScope.users.push(resp.data);
                $rootScope.user.username = "";
                $rootScope.user.password = "";
                $rootScope.user.firstName = "";
                $rootScope.user.lastName = "";
                $rootScope.user.email = "";
                $rootScope.user.roles = [];
            }, handleError);
        };
        $rootScope.selectUser = function(user, index) {
            $rootScope.user = angular.copy(user);
            $rootScope.currentUser = index;
        };
        function handleError(error) {
            $rootScope.error = error;
        }
    }
})();
