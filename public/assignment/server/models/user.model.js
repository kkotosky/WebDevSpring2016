var mock = require("./user.mock.json");
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var api = {
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findAllUsers: findAllUsers,
        findByUsername: findByUsername,
        findById: findById,
        findByUserCredentials: findByUserCredentials,
        updateUser: updateUser
    };
    var userSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model("User", userSchema);

    return api;

    function ensureUserInFormat(user){
        return {
            username: user.username || "",
            password: user.password || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            emails: [user.email] || "",
            _id : user._id || "",
            phones: user.phones || ""
        };

    }
    function createUser(user) {
        var def = q.defer();
        // insert new user with mongoose user model's create()
        var newUser = ensureUserInFormat(user);
        UserModel.create(newUser, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function deleteUser(id) {
        var def = q.defer();

        UserModel.remove({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });

        return def.promise;
    }
    function findAllUsers() {
        var def = q.defer();
        UserModel.find({}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function findByUsername(username) {
        var def = q.defer();
        UserModel.find({username:username}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function findById(id) {
        var def = q.defer();
        UserModel.find({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function findByUserCredentials(username, password) {
        var def = q.defer();
        UserModel.find({username:username, password:password}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
    function updateUser(id, user) {
        var def = q.defer();
        var newUser = ensureUserInFormat(user);
        UserModel.update({_id:id}, newUser, {}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};