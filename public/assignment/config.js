(function(){
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/home", {
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:  "ProfileController"
            })
            .when("/fields", {
                templateUrl: "views/forms/forms-fields.view.html",
                controller:  "FieldsController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller:  "FormController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:  "AdminController"
            })
        ;
    }
})();