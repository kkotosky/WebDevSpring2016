(function(){
    angular
        .module("KevinSporcleApp")
        .controller("SearchController", SearchController);

    function SearchController( $rootScope, QuizService, $routeParams, $location, $cookies) {
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
        if ($routeParams) {
            var val = $routeParams.search;
            QuizService.searchQuizzes(val).then(function(resp){
                $rootScope.validQuizzes = resp.data;
            });
            $rootScope.searchVal = {text : val};
            $rootScope.pageSearch = {text : val};
        }
        $rootScope.makeNewSearch = function(text) {
            QuizService.searchQuizzes(text).then(function(resp){
                $rootScope.validQuizzes = resp.data;
            });
            $rootScope.search = {text: text}
            $location.search('search', text);
        }
        $rootScope.takeQuiz = function(quiz) {
            $location.url("/quiz?quizId="+quiz._id);
        }
    }
})();