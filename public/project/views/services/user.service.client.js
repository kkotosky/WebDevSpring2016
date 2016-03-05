(function(){
    angular
        .module("KevinSporcleApp")
        .factory("UserService",UserService);

    function UserService($http, $q) {

        var users = [
            {"_id":123, "firstName":"Dick","lastName":"Grayson", "username":"nightwing","password":"nightwing"},
            {"_id":234, "firstName":"Tim","lastName":"Drake", "username":"red robin","password":"red robin"},
            {"_id":345, "firstName":"Damian","lastName":"Wayne", "username":"robin","password":"robin"},
            {"_id":456, "firstName":"Jason","lastName":"Todd", "username":"redhood","password":"redhood"},
            {"_id":567, "firstName":"Barbara","lastName":"Gordon", "username":"batgirl","password":"batgirl"},
            {"_id":678, "firstName":"Bruce","lastName":"Wayne", "username":"batman","password":"batman"}

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
            for (var i = 0; i < users.length; i++) {
                if ( users[i].username === username && users[i].password === password) {
                    callback(users[i]);
                    break;
                }
            }
            callback(null);
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