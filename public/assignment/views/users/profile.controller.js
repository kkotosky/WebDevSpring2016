(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService) {
        var model = this;

        $rootScope.updateUser = updateUser;
        function updateUser (user) {
            UserService.updateUser($rootScope.user._id, $rootScope.user, function(upUser){
                if (upUser) {
                    $rootScope.user = upUser;
                    console.log("success");
                } else {
                    console.log("fail");
                }
            });
        }
    }
})();