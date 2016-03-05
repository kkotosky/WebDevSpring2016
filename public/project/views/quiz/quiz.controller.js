(function(){
    angular
        .module("KevinSporcleApp")
        .controller("QuizController", QuizController);

    function QuizController($location, $rootScope, QuizService, $routeParams) {
        var id = $routeParams.quizId;
        $rootScope.numRows = 0;
        $rootScope.numCols = 0;
        QuizService.getFullQuiz(id).then(function(resp){
            $rootScope.quiz = resp;
            $rootScope.numRows = resp.rows;
            $rootScope.numCols = resp.columns;
            $rootScope.classes = {
                rows :getRowClass(resp.columns)
            }
        });
        $rootScope.getArray = function(num) {
            return new Array(num);
        };
        $rootScope.getSection = function(i,j) {
            return $rootScope.quiz.answers[j][i];
        }
        function getRowClass(numRows) {
            if(numRows === 1) {
                return "col-md-10";
            } else if (numRows === 2) {
                return "col-md-5";
            } else if (numRows === 4) {
                return "col-md-3";
            }
        }
    }
})();