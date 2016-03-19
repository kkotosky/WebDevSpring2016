(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

    function FormService($http, $q) {

        var data = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
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
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return api;

        function createFormForUser(userId, form, callback) {
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function findAllFormsForUser(userId, callback) {
            return $http.get('/api/assignment/user/'+userId+'/form');
        }

        function deleteFormById(formId, callback) {
            return $http.delete('/api/assignment/form/'+formId);
        }

        function updateFormById(formId, newForm, callback) {
            return $http.put('/api/assignment/form/'+formId, newForm);
        }
    }
})();