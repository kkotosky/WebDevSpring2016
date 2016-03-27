(function(){
    angular
        .module("KevinSporcleApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var model = this;
        $rootScope.login = login;
        $rootScope.register = register;
        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(userInfo){
                if (userInfo != null) {
                    $rootScope.currentUser = userInfo.data;
                    $location.url("/profile");
                    $rootScope.loggedIn = true;
                } else {
                    console.log("fail");
                }
            })
        }
        function register (nuser) {
            if (nuser.password !== nuser.retype) {
                $rootScope.alert = "Passwords do not Match";
            }
            UserService.createUser(nuser).then(function(user) {
                console.log(user);
                if (user.data) {
                    $location.url("/profile");
                    $rootScope.currentUser = user.data;
                    $rootScope.loggedIn = true;
                } else {
                    $rootScope.alert = "Not able to register";
                }
            });
        }
    }
})();