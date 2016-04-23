var fullQuizzesMock = require("./full_quizzes.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    var fullQuizSchema = require('./full_quizzes.schema.server.js')(mongoose);
    var fQuizModel = mongoose.model("FullQuiz", fullQuizSchema);

    var api = {
        getFullQuiz: getFullQuiz,
        makeFullQuiz: makeFullQuiz,
        updateQuiz: updateQuiz,
        deleteFullQuiz: deleteFullQuiz
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

    function deleteFullQuiz(id) {
        var def = q.defer();
        fQuizModel.remove({_id: id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function updateQuiz(quiz) {
        var def = q.defer();
        fQuizModel.findOne({_id:quiz._id},function (err, doc) {
            console.log(doc);
            console.log(quiz);
            if (err) {
                def.reject(err);
            } else {
                doc.title= quiz.title;
                doc.description= quiz.description;
                doc.multi=quiz.multi;
                doc.question=quiz.question;
                doc.headers=quiz.headers;
                doc.columns=quiz.columns;
                doc.rows=quiz.rows;
                doc.createdBy=quiz.createdBy;
                doc.answers1=quiz.answers1;
                doc.answers2=quiz.answers2;
                doc.answers3=quiz.answers3;
                doc.answers4=quiz.answers4;
                doc.answers5=quiz.answers5;
                doc.answers6=quiz.answers6;
                doc.answers7=quiz.answers7;
                doc.answers8=quiz.answers8;
                doc.questions1=quiz.questions1;
                doc.questions2=quiz.questions2;
                doc.questions3=quiz.questions3;
                doc.questions4=quiz.questions4;
                doc.questions5=quiz.questions5;
                doc.questions6=quiz.questions6;
                doc.questions7=quiz.questions7;
                doc.questions8=quiz.questions8;
                doc.save();
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};