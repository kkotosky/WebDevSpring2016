(function(){
    angular
        .module("KevinSporcleApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, QuizService, UserStatsService) {
        if (!$rootScope.loggedIn) {
            $location.url("/register");
        } else {
            $rootScope.stats = {};
            QuizService.getPopQuizzes().then(function(resp){
                $rootScope.priorQuizzes = resp.data;
            });
            QuizService.getUserQuizzes($rootScope.currentUser._id).then(function(resp){
                $rootScope.userQuizzes = resp.data;
            });
            UserStatsService.findStats($rootScope.currentUser.username).then(function(resp){
                var data = resp.data[0];
                $rootScope.stats.average = data.average;
                $rootScope.stats.gamesPlayed = data.gamesPlayed;
                $rootScope.stats.lastPlayed = data.lastPlayed;
            });
            $rootScope.takeQuiz = function(quiz) {
                $location.url("/quiz?quizId="+quiz._id);
            };
            $rootScope.editQuiz = function (quiz) {
                $location.url("/edit?quizId="+quiz._id);
            };
        }
    }
})();