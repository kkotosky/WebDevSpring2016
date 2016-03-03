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
            form._id = generateUUID();
            form.userId = userId;
            data.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var tmp = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === userId) {
                    tmp.push(data[i]);
                }
            }
            callback(tmp);
        }

        function deleteFormById(formId, callback) {
            var tmp = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === formId) {
                    data.splice(i,i+1);
                }
            }
            callback(data);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id === formId) {
                    data[i] = newForm
                }
            }
            callback(newForm);
        }
    }
})();