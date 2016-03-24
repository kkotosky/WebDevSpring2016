module.exports = function(app, model) {
    app.get("/api/project/quizzes/full/:quizId", getFullQuiz);

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
            console.log(resp);
            res.json(resp);
        }, function (e) {
            res.status(404).send(e);
        });
    }


};