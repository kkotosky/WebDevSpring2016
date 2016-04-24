(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, UserService) {
        $rootScope.logout = function(){
            UserService.logout().then(function(resp){
                $rootScope.user = {};
                $rootScope.loggedIn = false;
                $rootScope.admin = false;
            });
        }
    }
})();