var fullQuizzesMock = require("./full_quizzes.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var fullQuizSchema = require('./full_quizzes.schema.server.js')(mongoose);
    var fQuizModel = mongoose.model("FullQuiz", fullQuizSchema);

    var api = {
        getFullQuiz: getFullQuiz,
        makeFullQuiz: makeFullQuiz
    };
    var fullQuizzes = fullQuizzesMock.data;
    return api;

    function getFullQuiz(id) {
        var def = q.defer();
        fQuizModel.find({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function makeFullQuiz(quiz) {
        var def = q.defer();
        fQuizModel.create(quiz, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};