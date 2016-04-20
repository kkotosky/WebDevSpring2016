module.exports = function(app, model) {
    app.get("/api/project/quizzes/full/:quizId", getFullQuiz);
    app.post("/api/project/quizzes/full", makeFullQuiz);
    app.put("/api/project/quizzes/full", updateFullQuiz);
    app.delete("/api/project/quizzes/full/:id", deleteFullQuiz);
    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function getFullQuiz(req, res) {
        var id = req.params.quizId;
        model.getFullQuiz(id).then(function(resp){
            res.json(resp);
        }, function (e) {
            res.status(503).send(e);
        });
    }

    function makeFullQuiz(req, res) {
        var quiz = req.body;
        quiz._id = generateUUID();
        model.makeFullQuiz(quiz).then(function(resp){
            res.json(resp);
        }, function (e) {
            res.status(503).send(e);
        });
    }

    function updateFullQuiz(req, res) {
        var quiz = req.body;
        model.updateQuiz(quiz).then(function(resp){
            res.json(resp);
        }, function (e) {
            res.status(503).send(e);
        });
    }

    function deleteFullQuiz(req, res) {
        var quizId = req.params.id;
        model.deleteFullQuiz(quizId).then(function(resp){
            res.json(resp);
        }, function (e) {
            res.status(503).send(e);
        });
    }


};