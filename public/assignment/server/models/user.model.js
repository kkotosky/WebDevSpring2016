var mock = require("./user.mock.json");
var q = require("q");

module.exports = function() {

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
    return api;

    function createUser(user) {
        var def = q.defer();
        mock.data.push(user);
        def.resolve(user);
        return def.promise;
    }
    function deleteUser(id) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i]._id === id) {
                mock.data.splice(i, i+1);
                found = true;
                break;
            }
        }
        if (found) {
            def.resolve(mock.data);
        } else {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function findAllUsers() {
        var def = q.defer();
        if (mock.data.length > 0) {
            def.resolve(mock.data);
        } else {
            def.reject("No Users Exist");
        }
        return def.promise;
    }
    function findByUsername(username) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i].username === username) {
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function findById(id) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            console.log(mock.data[i]);
            if (""+mock.data[i]._id === id) {
                found = true;
                def.resolve(mock.data[i]);
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function findByUserCredentials(username, password) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i].username === username && mock.data[i].password === password) {
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }
    function updateUser(id, user) {
        var def = q.defer();
        var found = false;
        for (var i = 0; i < mock.data.length; i++) {
            if (mock.data[i]._id === id) {
                mock.data[i] = user;
                def.resolve(mock.data[i]);
                found = true;
                break;
            }
        }
        if (!found) {
            def.reject("Not Found");
        }
        return def.promise;
    }

}