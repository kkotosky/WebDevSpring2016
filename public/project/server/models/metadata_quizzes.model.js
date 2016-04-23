var metaDataQuizzesMock = require("./quizzes.mock.json").data;
var q = require("q");

module.exports = function(db, mongoose) {
    var api = {
        getPopQuizzes: getPopQuizzes,
        getMetaQuizzes: getMetaQuizzes,
        getUserQuizzes: getUserQuizzes,
        getQuiz: getQuiz,
        searchQuizzes:searchQuizzes,
        makeMetaQuizzes:makeMetaQuizzes,
        updateMetaQuiz : updateMetaQuiz,
        deleteMetaQuizzes:deleteMetaQuizzes
    };
    var metaQuizSchema = require('./metadata.schema.server.js')(mongoose);
    var metaQuizModel = mongoose.model("MetaQuiz", metaQuizSchema);

    return api;

    function makeMetaQuizzes(quiz) {
        var def = q.defer();
        quiz.popular = false;
        metaQuizModel.create(quiz, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function deleteMetaQuizzes(id) {
        var def = q.defer();
        metaQuizModel.remove({_id:id}, function (err, doc) {
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
        metaQuizModel.find({popular:true}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function getMetaQuizzes() {
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

    function updateMetaQuiz (metaUpdate) {
        var def = q.defer();
        metaQuizModel.findOne({_id:metaUpdate._id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                doc.title = metaUpdate.title;
                doc.description = metaUpdate.description;
                doc.popular = metaUpdate.popular;
                doc.save();
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};