(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($http, $q) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user?username='+username+'&password='+password);
        }
        function findAllUsers() {
            return $http.get('/api/assignment/user');
        }
        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }
        function deleteUserById(userId, password) {
            return $http.delete('/api/assignment/user/'+userId);
        }
        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username='+username);
        }
        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/'+userId, user);
        }

    }
})();