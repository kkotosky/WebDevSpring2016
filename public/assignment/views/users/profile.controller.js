(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, UserService) {
        var model = this;

        $rootScope.updateUser = updateUser;
        function updateUser (user) {
            console.log($rootScope.user);
            UserService.updateUser($rootScope.user._id, $rootScope.user).then(function(upUser){
                if (upUser) {
                    window.alert("Successful Update")
                } else {
                    console.log("fail");
                }
            });
        }
    }
})();