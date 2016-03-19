(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService);

    function FieldService($http, $q) {

        var api = {
            getFieldsByFormId:getFieldsByFormId,
            getFieldByFieldId:getFieldByFieldId,
            deleteFieldById:deleteFieldById,
            createField:createField,
            updateField:updateField
        };
        return api;

        function getFieldsByFormId(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }
        function getFieldByFieldId(formId,fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }
        function deleteFieldById(formId,fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }
        function createField(formId, field) {
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        }
        function updateField(formId, fieldId, field, callback) {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }
    }
})();