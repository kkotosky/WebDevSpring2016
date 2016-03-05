(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $rootScope, FormService) {
        var model = this;

        $rootScope.updateForm = updateform;
        $rootScope.addForm = addForm;
        $rootScope.deleteForm = deleteForm;
        $rootScope.selectForm = selectForm;
        $rootScope.editingForm = -1;
        $rootScope.nform = {name : ""};

        FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
            $rootScope.forms = forms;
        });

        function updateform(title) {
            if ($rootScope.editingForm >= 0) {
                $rootScope.forms[$rootScope.editingForm].title = title.name;
                var upForm = $rootScope.forms[$rootScope.editingForm].title;
                FormService.updateFormById(upForm._id, upForm,function(resp) {
                    console.log("updates completed");
                });
            }
            $rootScope.editingForm = -1;
            $rootScope.nform = {name : ""};
        };

        function addForm(toBeForm) {
            var newForm  = {
                title:toBeForm.name
            };
            FormService.createFormForUser($rootScope.user._id, newForm, function(newForm){
                if (newForm) {
                    $rootScope.forms.push(newForm);
                } else {
                    console.log("failed");
                }
            });
            $rootScope.nform = {name : ""};
            console.log($rootScope.nform);
        };

        function deleteForm(form,i){
            FormService.deleteFormById(form._id, function(resp){
                $rootScope.forms.splice(i,i+1);
            });
        };

        function selectForm(form, i) {
            $rootScope.nform = {name : form.title};
            $rootScope.editingForm = i;
        };
    }
})();