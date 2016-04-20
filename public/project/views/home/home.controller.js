(function(){
    angular
        .module("KevinSporcleApp")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, QuizService, $cookies) {
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
        }
        QuizService.getPopQuizzes().then(function(resp){
            $rootScope.popQuizzes = resp.data;
        });
        QuizService.getUserQuizzes($rootScope.currentUser._id).then(function(resp){
            $rootScope.userQuizzes = resp.data;
        });
        $rootScope.takeQuiz = function(quiz) {
            $location.url("/quiz?quizId="+quiz._id);
        };
        $rootScope.editQuiz = function (quiz) {
            $location.url("/edit?quizId="+quiz._id);
        };
        $rootScope.logout = function(){
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