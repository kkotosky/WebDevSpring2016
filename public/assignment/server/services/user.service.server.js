var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose       = require("mongoose");
module.exports = function(app, model) {

    var auth = authorized;

    app.post('/api/assignment/login', passport.authenticate('local'),login);
    app.post('/api/assignment/logout', logout);
    app.post('/api/assignment/register', register);
    app.get('/api/assignment/loggedin', loggedin);
    app.get('/api/assignment/user',  auth, findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id",findById);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);
   // app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    /*app.get   ('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect: '/#/profile',
            failureRedirect: '/#/login'
    }));*/

    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK_URL
    };
    var facebookConfig = {
                clientID        : process.env.FACEBOOK_CLIENT_ID,
                clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
                callbackURL     : process.env.FACEBOOK_CALLBACK_URL
        };

    //passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

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
        } else if (username) {
            findByUsername(req, res, username);
        } else {
            findAllUsers(req, res);
        }
    }

    function localStrategy(username, password, done) {
        model
            .findByUserCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function googleStrategy(token, refreshToken, profile, done) {
        model
            .findUserByGoogleId(profile.id)
            .then(
                    function(user) {
                            if(user) {
                                    return done(null, user);
                                } else {
                                    var newGoogleUser = {
                                            firstName: profile.name.firstName,
                                            lastName: profile.name.lastName,
                                            email: profile.emails[0].value,
                                            google: {
                                                id: profile.id,
                                                token: token
                                            }
                                    };
                                    return model.createUser(newGoogleUser);
                                }
                        },
                    function(err) {
                            if (err) { return done(err); }
                        }
                )
            .then(
                    function(user){
                            return done(null, user);
                        },
                    function(err){
                            if (err) { return done(err); }
                        }
                );
    }
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    function register(req, res) {
        var newUser = req.body;
        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
    function login(req, res, next) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true;
        }
        return false;
    }
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
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
        console.log("find all users");
        console.log(req.user);
        if(isAdmin(req.user)) {
            model.findAllUsers().then(function(resp){
                console.log("find all users44");
                console.log(resp);
                res.json(resp);
            }, function(err){
                console.log("find all users");
                res.status(400).send(err);
            });
        } else {
            console.log("find all users");
            res.status(403);
        }
    }
    function findById(req, res) {
        var id = req.params.id;
        model.findById(id).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(404).send(e);
        });
    }
    function findByUsername(req, res, uname) {
        model.findByUsername(uname).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(404).send(e);
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
        model.deleteUser(id).then(function(resp){
            res.json(resp);
        },function(e){
            res.status(400).send(e);
        });
    }
};