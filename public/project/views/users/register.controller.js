(function(){
    angular
        .module("KevinSporcleApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService, UserStatsService, $cookies) {
        var model = this;
        $rootScope.login = login;
        $rootScope.register = register;
        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(userInfo){
                if (userInfo[0] != null) {
                    $rootScope.currentUser = userInfo.data[0];
                    $rootScope.loggedIn = true;
                    $cookies.put("id", $rootScope.currentUser._id);
                    $cookies.put("username", $rootScope.currentUser.username);
                    $cookies.put("loggedIn", $rootScope.loggedIn);
                    $cookies.put("firstName", $rootScope.currentUser.firstName);
                    $cookies.put("lastName", $rootScope.currentUser.lastName);
                    $cookies.put("email", $rootScope.currentUser.email);
                    $cookies.put("admin", $rootScope.currentUser.admin);
                    $location.url("/profile");
                } else {
                    window.alert("Username / password combo does not exist");
                }
            })
        }
        function register (nuser) {
            console.log(nuser);
            if (nuser.password !== nuser.retype) {
                $rootScope.alert = "Passwords do not Match";
            } else {
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
                            $rootScope.currentUser = user.data;
                            $cookies.put("id", $rootScope.currentUser._id);
                            $cookies.put("username", $rootScope.currentUser.username);
                            $cookies.put("loggedIn", $rootScope.loggedIn);
                            $cookies.put("firstName", $rootScope.currentUser.firstName);
                            $cookies.put("lastName", $rootScope.currentUser.lastName);
                            $cookies.put("email", $rootScope.currentUser.email);
                            $cookies.put("admin", $rootScope.currentUser.admin);
                            $rootScope.loggedIn = true;
                            $location.url("/profile");
                        });
                    } else {
                        window.alert("Not able to register");
                    }
                });

            }
        }
    }
})();