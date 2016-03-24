var fullQuizzesMock = require("./full_quizzes.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {
    var api = {
        getFullQuiz: getFullQuiz
    };
    var fullQuizzes = fullQuizzesMock.data;
    return api;

    function getFullQuiz(id) {
        var def = q.defer();
        for (var i = 0; i < fullQuizzes.length; i++) {
            if (id === fullQuizzes[i]._id) {
                def.resolve(fullQuizzes[i]);
            }
        }
        return def.promise;
    }
};