var metaDataQuizzesMock = require("./quizzes.mock.json").data;
var q = require("q");

module.exports = function(db, mongoose) {
    var api = {
        getPopQuizzes: getPopQuizzes,
        getUserQuizzes: getUserQuizzes,
        getQuiz: getQuiz,
        searchQuizzes:searchQuizzes,
        makeMetaQuizzes:makeMetaQuizzes

    };
    var metaQuizSchema = require('./metadata.schema.server.js')(mongoose);
    var metaQuizModel = mongoose.model("MetaQuiz", metaQuizSchema);

    var userQuizzes = metaDataQuizzesMock.userQuizzes;
    var popQuizzes = metaDataQuizzesMock.popQuizzes;
    var allQuizzes = userQuizzes.concat(popQuizzes);
    return api;

    function makeMetaQuizzes(quiz) {
        var def = q.defer();
        metaQuizModel.create(quiz, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function getPopQuizzes() {
        var def = q.defer();
        metaQuizModel.find({}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function getUserQuizzes (id) {
        var def = q.defer();
        metaQuizModel.find({createdBy:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function getQuiz (id) {
        var def = q.defer();
        metaQuizModel.find({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function searchQuizzes (text) {
        var def = q.defer();
        metaQuizModel.find({title:{$regex:text}}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};