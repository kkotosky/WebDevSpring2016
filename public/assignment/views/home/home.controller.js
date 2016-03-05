(function(){
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope) {
        $rootScope.logout = function(){
            $rootScope.user = {};
            $rootScope.loggedIn = false;
            $rootScope.isAdmin = false;
        }
    }
})();