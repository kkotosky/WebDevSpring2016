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
            UserService.createUser(user, function(user){
                if (user ) {
                    $location.url("/profile");
                    $rootScope.user = user;
                } else {
                    $rootScope.alert = "Not able to register";
                }
            });
        }
    }
})();