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
                    $location.url("/profile");
                    $rootScope.user = user.data;
                    $rootScope.user.email = user.data.emails[0];
                    $rootScope.loggedIn = true;
                } else {
                    $rootScope.alert = "Not able to register";
                }
            });
        }
    }
})();