(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var model = this;
        $rootScope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password, function(userInfo){
                if (userInfo != null) {
                    $rootScope.user = userInfo;
                    $location.url("/profile");
                    $rootScope.loggedIn = true;
                    $rootScope.isAdmin = _.contains(userInfo.roles, 'admin');
                } else {
                    console.log("fail");
                }
            });
        }
    }
})();