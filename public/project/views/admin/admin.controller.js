(function(){
    angular
        .module("KevinSporcleApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $cookies, QuizService, $rootScope) {
        $rootScope.meta = {
            quizzes : [],
            popQuizzes : []
        }
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
            QuizService.getPopQuizzes().then(function(resp){
                $rootScope.meta.popQuizzes = resp.data;
                QuizService.getMetaQuizzes().then(function(resp2){
                    $rootScope.meta.quizzes = checkIfContains($rootScope.meta.popQuizzes, resp2.data);
                });
            });
            $rootScope.addToPopular = function(quiz) {
                quiz.popular = true;
                QuizService.updateMetaQuiz(quiz).then(function(resp){
                    console.log("successfully added to popular");
                    $rootScope.meta.quizzes = findAndRemoveQuiz(quiz, $rootScope.meta.quizzes);
                    $rootScope.meta.popQuizzes.push(quiz);
                });
            };
            $rootScope.removeFromPopular = function(quiz) {
                quiz.popular = false;
                QuizService.updateMetaQuiz(quiz).then(function(resp){
                    console.log("successfully removed from popular");
                    $rootScope.meta.popQuizzes = findAndRemoveQuiz(quiz, $rootScope.meta.popQuizzes);
                    $rootScope.meta.quizzes.push(quiz);
                });
            };
        }
        checkIfContains = function (pop, all ) {
            var toReturn = [];
            var found;
            for (var j = 0; j < all.length; j++) {
                found = false;
                for (var i = 0; i < pop.length; i++) {
                    if (all[j]._id == pop[i]._id) {
                        found = true;
                    }
                }
                if (!found) {
                    toReturn.push(all[j]);
                }
                found = false;
            }
            return toReturn;
        };
        findAndRemoveQuiz = function(quiz, quizzes){
            for (var i = 0; i < quizzes.length; i++) {
                if (quiz._id === quizzes[i]._id) {
                    console.log("found " + i);
                    quizzes.splice(i,1);
                    break;
                }
            }
            return quizzes;
        }
    }
})();