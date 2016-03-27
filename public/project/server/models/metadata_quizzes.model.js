var metaDataQuizzesMock = require("./quizzes.mock.json").data;
var q = require("q");

module.exports = function(db, mongoose) {
    var api = {
        getPopQuizzes: getPopQuizzes,
        getUserQuizzes: getUserQuizzes,
        getQuiz: getQuiz,
        searchQuizzes:searchQuizzes,
    };
    var userQuizzes = metaDataQuizzesMock.userQuizzes;
    var popQuizzes = metaDataQuizzesMock.popQuizzes;

    var allQuizzes = userQuizzes.concat(popQuizzes);

    return api;


    function getPopQuizzes() {
        var def = q.defer();
        def.resolve(popQuizzes);
        return def.promise;
    }
    function getUserQuizzes (id) {
        var def = q.defer();
        var tmp = [];
        console.log(allQuizzes);
        for (var i = 0; i < allQuizzes.length; i++) {
            if (id === allQuizzes[i].creator) {
                tmp.push(allQuizzes[i]);
            }
        }
        def.resolve(tmp);
        return def.promise;
    }
    function getQuiz (id) {
        var def = q.defer();
        for (var i = 0; i < allQuizzes.length; i++) {
            if (id === allQuizzes[i]._id) {
                def.resolve(allQuizzes[i])
            }
        }
        return def.promise;
    }
    function searchQuizzes (text) {
        var def = q.defer();
        var titleTmp = [];
        var descriptTmp = []
        for (var i = 0; i < allQuizzes.length; i++) {
            if (allQuizzes[i].title.indexOf(text) >= 0) {
                titleTmp.push(allQuizzes[i]);
            } else if (allQuizzes[i].description.indexOf(text) >= 0){
                descriptTmp.push(allQuizzes[i]);
            }
        }
        def.resolve(titleTmp.concat(descriptTmp));
        return def.promise;
    };

};