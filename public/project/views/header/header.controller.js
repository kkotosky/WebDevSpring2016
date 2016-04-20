(function(){
    angular
        .module("KevinSporcleApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $cookies) {
        $rootScope.searchText = function(text) {
            $location.url("/search?search=" + text);
        };
        $rootScope.logout = function() {
            $rootScope.currentUser = {};
            $rootScope.loggedIn = false;
            $cookies.remove("id");
            $cookies.remove("username");
            $cookies.remove("loggedIn");
            $cookies.remove("firstName");
            $cookies.remove("lastName");
            $cookies.remove("email");
            $cookies.remove("admin");
            $location.url("/home");
        }
    }
})();