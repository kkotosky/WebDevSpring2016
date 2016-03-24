module.exports = function(app, model) {
    app.get("/api/project/quizzes/meta/popular", getPopQuizzes);
    app.get("/api/project/quizzes/meta/user/:id", getUserQuizzes);
    app.get("/api/project/quizzes/meta/:quizId", getQuiz);
    app.get("/api/project/quizzes/meta/search/:searchText", searchQuizzes);

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function getPopQuizzes(req, res) {
        model.getPopQuizzes().then(function(resp){
            console.log(resp);
            res.json(resp);
        }, function (e) {
            res.status(404).send(e);
        });
    }

    function getUserQuizzes(req, res) {
        var id = req.params.id;
        model.getUserQuizzes(id).then(function(resp){
            console.log(resp);
            res.json(resp);
        }, function (e) {
            res.status(404).send(e);
        });
    }

    function getQuiz(req, res) {
        var id = req.params.quizId;
        model.getQuiz(id).then(function(resp){
            console.log(resp);
            res.json(resp);
        }, function (e) {
            res.status(404).send(e);
        });
    }

    function searchQuizzes(req, res) {
        var searchText = req.params.searchText;
        model.searchQuizzes(searchText).then(function(resp){
            console.log(resp);
            res.json(resp);
        }, function (e) {
            res.status(404).send(e);
        });
    }

};