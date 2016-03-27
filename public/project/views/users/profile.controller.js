(function(){
    angular
        .module("KevinSporcleApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, QuizService) {
        QuizService.getPopQuizzes().then(function(resp){
            $rootScope.priorQuizzes = resp.data;
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
    }
})();