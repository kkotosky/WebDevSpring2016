(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService) {
        var model = this;

        $rootScope.updateForm = updateForm;
        $rootScope.addForm = addForm;
        $rootScope.deleteForm = deleteForm;
        $rootScope.selectForm = selectForm;

        FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
            $rootScope.forms = forms;
            console.log($rootScope.forms);
        });

        function updateform() {

        };

        function addForm(nform) {
            FormService.createFormForUser($rootScope.user._id, nform, function(newForm){
                if (newForm) {
                    console.log("success");
                    $rootScope.forms.push(newForm);
                } else {
                    console.log("failed");
                }
            });
        };

        function deleteForm(form){
            FormService.createFormForUser(form._id, function(newForm){
                FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
                    $rootScope.forms = forms;
                    console.log($rootScope.forms);
                });
            });
        };

        function selectForm(){

        };
    }
})();