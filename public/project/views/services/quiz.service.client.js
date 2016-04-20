(function(){
    angular
        .module("KevinSporcleApp")
        .factory("QuizService",QuizService);

    function QuizService($http, $q) {
        var api = {
            getPopQuizzes: getPopQuizzes,
            getMetaQuizzes: getMetaQuizzes,
            getUserQuizzes: getUserQuizzes,
            getQuiz: getQuiz,
            searchQuizzes:searchQuizzes,
            getFullQuiz: getFullQuiz,
            makeFullQuiz: makeFullQuiz,
            updateFullQuiz: updateFullQuiz,
            makeMetaQuizzes: makeMetaQuizzes,
            updateMetaQuiz:updateMetaQuiz
        };
        return api;

        function getPopQuizzes() {
            return $http.get("/api/project/quizzes/meta/popular");
        }
        function getMetaQuizzes() {
            return $http.get("/api/project/quizzes/meta/all");
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
        function updateFullQuiz(quiz) {
            return $http.put("/api/project/quizzes/full", quiz);
        }
        function makeMetaQuizzes(metaQuiz) {
            return $http.post("/api/project/quizzes/meta", metaQuiz);
        }
        function updateMetaQuiz(metaQuiz) {
            return $http.put("/api/project/quizzes/meta", metaQuiz);
        }
        //Will Need to function to sort which are most relevant to user (i.e.) Popularity
    }
})();