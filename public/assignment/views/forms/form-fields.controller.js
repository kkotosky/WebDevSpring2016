(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($location, $rootScope, FieldService, $routeParams) {
        $rootScope.fields = [];
        $rootScope.newField = {};
        var formId = $routeParams.formId;
        console.log(formId);

        FieldService.getFieldsByFormId(formId).then(function(resp){
            $rootScope.formFields = resp.data;
        }, function(e) {
        });

        $rootScope.addField = function(type){
            var type = $rootScope.newField.type;
            if (type === 'TEXT' ){
                $rootScope.formFields.push({type:'TEXT', placeholder:"placeholder","label":"label"});
            } else if (type === 'DATE') {
                $rootScope.formFields.push({type:'DATE', placeholder:"placeholder","label":"label"});
            } else if (type === 'EMAIL') {
                $rootScope.formFields.push({type:'EMAIL', placeholder:"placeholder","label":"label"});
            } else if (type === 'OPTIONS') {
                $rootScope.formFields.push({type:'OPTIONS', placeholder:"placeholder","label":"label"});
            } else if (type === 'CHECKBOX') {
                $rootScope.formFields.push({type:'CHECKBOX', placeholder:"placeholder","label":"label"});
            } else if (type === 'RADIO') {
                $rootScope.formFields.push({type:'RADIO', placeholder:"placeholder","label":"label"});
            } else if (type === 'PARAGRAPH') {
                $rootScope.formFields.push({type:'PARAGRAPH', placeholder:"placeholder","label":"label"});
            }
        };
    }
})();