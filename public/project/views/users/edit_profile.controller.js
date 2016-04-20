(function(){
    angular
        .module("KevinSporcleApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($location, $rootScope, UserService, $cookies) {
        if (!$rootScope.loggedIn) {
            $rootScope.loggedIn = $cookies.get("loggedIn");
            $rootScope.currentUser = {
                username : $cookies.get("username"),
                firstName : $cookies.get("firstName"),
                lastName : $cookies.get("lastName"),
                email : $cookies.get("email"),
                _id : $cookies.get("id"),
                admin : $cookies.get("admin"),
            };
            if (!$rootScope.loggedIn) {
                $location.url("/register");
            }
        } else {
            var model = this;
            console.log($rootScope.currentUser);
            function updateUser(user) {
                UserService.updateUser($rootScope.currentUser._id, $rootScope.currentUser).then(function (upUser) {
                    if (upUser) {
                        $rootScope.currentUser = upUser.data;
                        window.alert("Successful Update");
                    } else {
                        console.log("fail");
                    }
                });
            }
        }
    }
})();