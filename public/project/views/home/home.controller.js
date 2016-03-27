(function(){
    angular
        .module("KevinSporcleApp")
        .controller("HomeController", HomeController);

    function HomeController($location, $rootScope, QuizService) {
        QuizService.getPopQuizzes().then(function(resp){
            $rootScope.popQuizzes = resp.data;
        });
        QuizService.getUserQuizzes("123").then(function(resp){
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
        }

    }
})();