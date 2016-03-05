(function(){
    angular
        .module("KevinSporcleApp")
        .controller("SearchController", SearchController);

    function SearchController( $rootScope, QuizService, $routeParams, $location) {
        if ($routeParams) {
            var val = $routeParams.search;
            QuizService.searchQuizzes(val).then(function(resp){
                $rootScope.validQuizzes = resp;
            });
            $rootScope.searchVal = {text : val};
            $rootScope.pageSearch = {text : val};
        }
        $rootScope.makeNewSearch = function(text) {
            QuizService.searchQuizzes(text).then(function(resp){
                $rootScope.validQuizzes = resp;
            });
            $rootScope.search = {text: text}
            $location.search('search', text);
        }
        $rootScope.takeQuiz = function(quiz) {
            $location.url("/quiz?quizId="+quiz._id);
        }
    }
})();