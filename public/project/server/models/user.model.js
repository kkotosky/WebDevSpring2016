var mockUsers = require("./user.mock.json").users;
var q = require("q");

module.exports = function(db, mongoose) {

    var api = {
        findByUserCredentials: findByUserCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("ProjectUser", userSchema);

    return api;

    function generateUUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function findByUserCredentials(username, password) {
        var def = q.defer();
        userModel.find({username:username, password:password}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function findAllUsers(callback) {
        var def = q.defer();
        userModel.find({}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function createUser(user) {
        var def = q.defer();
        userModel.create(user, function (err, doc) {
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
        userModel.find({_id:id}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function deleteUserById(userId, password) {
        var def = q.defer();
        userModel.remove({_id:userId}, function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }

    function updateUser(userId, user) {
        var def = q.defer();
        userModel.update({_id:userId}, user , function (err, doc) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(doc);
            }
        });
        return def.promise;
    }
};