(function(){
    angular
        .module("KevinSporcleApp")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($location, $rootScope, UserService) {
        if (!$rootScope.loggedIn) {
            $location.url("/register");
        } else {
            var model = this;
            console.log($rootScope.currentUser);
            $rootScope.updateUser = updateUser;
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