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
        for (var i = 0; i < mockUsers.length; i++) {
            if ( mockUsers[i].username === username &&
                mockUsers[i].password === password) {
                def.resolve(mockUsers[i]);
                break;
            }
        }
        return def.promise;
    }

    function findAllUsers(callback) {
        var def = q.defer();
        def.resolve(mockUsers);
        return def.promise;
    }

    function createUser(user) {
        var def = q.defer();
        mockUsers.push(user);
        def.resolve(user);
        return def.promise;
    }

    function deleteUserById(userId, password) {
        var def = q.defer();
        for (var i = 0; i < mockUsers.size; i++) {
            if ( mockUsers[i]._id === userId) {
                mockUsers.splice(i,i+1);
                break;
            }
        }
        def.resolve(mockUsers);
        return def.promise;
    }

    function updateUser(userId, user) {
        var def = q.defer();
        for (var i = 0; i < mockUsers.size; i++) {
            if ( mockUsers[i]._id === userId) {
                mockUsers[i] = user;
            }
        }
        def.resolve(user);
        return def.promise;
    }
};