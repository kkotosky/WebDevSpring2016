(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var model = this;
        $rootScope.login = login;

        function login (user) {
            console.log(user);
            UserService.findUserByCredentials(user.username, user.password, function(userInfo){
                if (userInfo) {
                    $rootScope.user = userInfo;
                    $location.url("/profile");
                } else {
                    console.log("fail");
                }
            });
        }
    }
})();