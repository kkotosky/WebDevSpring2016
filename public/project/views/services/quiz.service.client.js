(function(){
    angular
        .module("KevinSporcleApp")
        .factory("QuizService",QuizService);

    function QuizService($http, $q) {
        var api = {
            getPopQuizzes: getPopQuizzes,
            getUserQuizzes: getUserQuizzes,
            getQuiz: getQuiz,
            searchQuizzes:searchQuizzes,
            getFullQuiz: getFullQuiz,
            makeFullQuiz: makeFullQuiz
        };
        return api;

        function getPopQuizzes() {
            return $http.get("/api/project/quizzes/meta/popular");
        }
        function getUserQuizzes (id) {
            return $http.get("/api/project/quizzes/meta/user/"+id);
        }
        function getQuiz (id) {
            return $http.get("/api/project/quizzes/meta/"+id);
        }
        function searchQuizzes (text) {
            return $http.get("/api/project/quizzes/meta/search/"+text);
        }
        function getFullQuiz(id) {
            return $http.get("/api/project/quizzes/full/"+id);

        }
        function makeFullQuiz(quiz) {
            return $http.post("/api/project/quizzes/full", quiz);
        }
        //Will Need to function to sort which are most relevant to user (i.e.) Popularity
    }
})();