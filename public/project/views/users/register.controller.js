(function(){
    angular
        .module("KevinSporcleApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService, UserStatsService) {
        var model = this;
        $rootScope.login = login;
        $rootScope.register = register;
        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(userInfo){
                if (userInfo != null) {
                    $rootScope.currentUser = userInfo.data[0];
                    $location.url("/profile");
                    $rootScope.loggedIn = true;
                } else {
                    console.log("fail");
                }
            })
        }
        function register (nuser) {
            if (nuser.password !== nuser.retype) {
                $rootScope.alert = "Passwords do not Match";
            }
            UserService.createUser(nuser).then(function(user) {
                if (user.data) {
                    UserStatsService.createStats(
                        {
                            username:user.data.username,
                            gamesPlayed : 0,
                            average: 100,
                            priorQuizzes: [],
                            lastPlayed: ""
                        }
                    ).then(function(resp){
                        $location.url("/profile");
                        $rootScope.currentUser = user.data;
                        $rootScope.loggedIn = true;
                    });
                } else {
                    window.alert("Not able to register");
                }
            });
        }
    }
})();