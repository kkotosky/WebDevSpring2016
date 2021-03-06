(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var model = this;
        $rootScope.login = login;

        function login (user)
        {

            UserService.login(user = {username: user.username, password:user.password}).then(function(userInfo){
                if (userInfo != null) {
                    $rootScope.user = userInfo.data[0];
                    $location.url("/profile");
                    $rootScope.loggedIn = true;
                    $rootScope.isAdmin = _.contains(userInfo.roles, 'admin');
                } else {
                    console.log("fail");
                }
            })
        }
    }
})();