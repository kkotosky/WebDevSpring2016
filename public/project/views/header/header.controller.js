(function(){
    angular
        .module("KevinSporcleApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location) {
        $rootScope.searchText = function(text) {
            //do some searching and show results
            $location.url("/search?search=" + text);
        }
        $rootScope.logout = function(){
            $rootScope.currentUser = {};
            $rootScope.loggedIn = false;
            $rootScope.admin = false;
            $location.url("/home");
        }
    }
})();