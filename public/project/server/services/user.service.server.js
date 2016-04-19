module.exports = function(app, model) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUsersHandler);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function findUsersHandler(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findByUserCredentials(req,res,username,password);
        } else {
            findAllUsers(req, res);
        }
    }

    function createUser(req , res) {
        var user = req.body;
        user._id = generateUUID();
        model.createUser(user).then(function(resp){
            res.json(resp);
        }, function(e){
            res.status(503).send("internal error");
        });

    }
    function findAllUsers(req, res) {
        model.findAllUsers().then(function(resp){
            res.json(resp);
        });

    }
    function findByUserCredentials(req, res, uname, pword) {
        model.findByUserCredentials(uname, pword).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(404).send(e);
        });
    }
    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        model.updateUser(id, user).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(400).send(e);
        });
    }
    function deleteUser(req, res) {
        var id = req.params.id;
        model.deleteUserById(id).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(400).send(e);
        });
    }
};