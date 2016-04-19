module.exports = function(app, model) {
    app.post("/api/project/userstats/", createStats);
    app.get("/api/project/userstats/:username", findStats);
    app.put("/api/project/userstats/:username", updateStats);
    app.delete("/api/project/userstats/:username", deleteStats);

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function findStats(req, res) {
        var username = req.params.username;
       model.findStats(username).then(function(resp){
           res.json(resp);
       }, function(e){
           res.status(503).send("internal error");
       });
    }
    function createStats(req , res) {
        var stats = req.body;
        stats._id = generateUUID();
        model.createStats(stats).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(503).send("internal error");
        });
    }
    function updateStats(req, res) {
        var username = req.params.username;
        var stats = req.body;
        model.updateStats(username,stats).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(503).send("internal error");
        });
    }

    function deleteStats(req, res) {
        var id = req.params.username;
        model.deleteStats(username).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(503).send("internal error");
        });
    }
};