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


        $rootScope.goToFields = goToFields;
        function goToFields(form) {
            console.log(form);
            $location.url("/form/"+form._id+"/fields");
        }

        FormService.findAllFormsForUser($rootScope.user._id).then(function(forms) {
            $rootScope.forms = forms.data;
        });
        function updateform(title) {
            if ($rootScope.editingForm >= 0) {
                $rootScope.forms[$rootScope.editingForm].title = title.name;
                var upForm = $rootScope.forms[$rootScope.editingForm];
                FormService.updateFormById(upForm._id, upForm).then(function(resp) {
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
            FormService.createFormForUser($rootScope.user._id, newForm).then(function(newForm){
                if (newForm) {
                    $rootScope.forms.push(newForm.data);
                } else {
                    console.log("failed");
                }
            }, function(e){
                console.log("failed");
            });
            $rootScope.nform = {name : ""};
        };

        function deleteForm(form,i){
            FormService.deleteFormById(form._id).then(function(resp){
                $rootScope.forms.splice(i,i+1);
            });
        };

        function selectForm(form, i) {
            $rootScope.nform = {name : form.title};
            $rootScope.editingForm = i;
        };
    }
})();