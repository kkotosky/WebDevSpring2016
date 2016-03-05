(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($http, $q) {

        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        function generateUUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var found = false;
            for (var i = 0; i < users.length; i++) {
                if ( users[i].username === username && users[i].password === password) {
                    callback(users[i]);
                    found = true;
                    break;
                }
            }
            if(!found) {
                callback(null);
            }
        }

        function findAllUsers(callback) {
            callback(users);

        }

        function createUser(user, callback) {
            user._id = generateUUID();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, password) {
            for (var i = 0; i < users.size; i++) {
                if ( users[i]._id === userId) {
                    users.splice(i,i+1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.size; i++) {
                if ( users[i]._id === userId) {
                    users[i] = user;
                    break;
                }
            }
            callback(user);
        }

    }
})();