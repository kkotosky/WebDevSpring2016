(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        $rootScope.logout = function(){
            UserService.logout().then(function(resp){
                $rootScope.user = {};
                $rootScope.loggedIn = false;
                $rootScope.admin = false;
            });
        }
    }
})();