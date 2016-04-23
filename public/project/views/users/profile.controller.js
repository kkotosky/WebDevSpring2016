(function(){
    angular
        .module("KevinSporcleApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $rootScope, QuizService, UserStatsService, $cookies) {
        if (!$rootScope.loggedIn) {
            $rootScope.loggedIn = $cookies.get("loggedIn");
            $rootScope.currentUser = {
                username : $cookies.get("username"),
                firstName : $cookies.get("firstName"),
                lastName : $cookies.get("lastName"),
                email : $cookies.get("email"),
                _id : $cookies.get("id"),
                admin : $cookies.get("admin")
            };
            if (!$rootScope.loggedIn) {
                $location.url("/register");
            }
        }
        if ($rootScope.loggedIn) {
            $rootScope.priorQuizzes = [];
            $rootScope.stats = {};
            console.log($rootScope.currentUser);
            QuizService.getUserQuizzes($rootScope.currentUser._id).then(function(resp){
                $rootScope.userQuizzes = resp.data;
            });
            UserStatsService.findStats($rootScope.currentUser.username).then(function(resp){
                var data = resp.data[0];
                $rootScope.stats.average = data.average;
                $rootScope.stats.averageString = (""+data.average).substring(0,4);
                $rootScope.stats.gamesPlayed = data.gamesPlayed;
                $rootScope.stats.lastPlayed = data.lastPlayed;
                $rootScope.stats.priorQuizzes = data.priorQuizzes;
                for (var i = 0; i < $rootScope.stats.priorQuizzes.length; i++) {
                    QuizService.getQuiz($rootScope.stats.priorQuizzes[i]).then(function(resp){
                       $rootScope.priorQuizzes.push(resp.data[0]);
                    });
                }
            });
            $rootScope.takeQuiz = function(quiz) {
                $location.url("/quiz?quizId="+quiz._id);
            };
            $rootScope.editQuiz = function (quiz) {
                $location.url("/edit?quizId="+quiz._id);
            };
            $rootScope.deleteQuiz = function (quiz, i) {
                QuizService.deleteFullQuiz(quiz._id).then(function(resp){
                    QuizService.deleteMetaQuiz(quiz._id).then(function(resp){
                        window.alert('Quiz deleted');
                        $rootScope.userQuizzes.splice(i ,1);
                    });
                });
            };
        }
    }
})();