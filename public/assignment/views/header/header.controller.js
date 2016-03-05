(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location) {
        $rootScope.logout = function(){
            $rootScope.user = {};
            $rootScope.loggedIn = false;
            $rootScope.admin = false;
        }
    }
})();