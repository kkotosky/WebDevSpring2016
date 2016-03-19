(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var model = this;

        $rootScope.register = register;

        function register (user) {
            if (user.password !== user.retype) {
                $rootScope.alert = "Passwords do not Match";
            }
            UserService.createUser(user).then(function(user) {
                if (user) {
                    console.log("user.data");
                    console.log(user.data);
                    $location.url("/profile");
                    $rootScope.user = user.data;
                    $rootScope.loggedIn = true;
                    console.log("$rootScope.user");
                    console.log($rootScope.user);
                } else {
                    $rootScope.alert = "Not able to register";
                }
            });
        }
    }
})();