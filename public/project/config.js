(function(){
    angular
        .module("KevinSporcleApp")
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
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:  "ProfileController"
            })
            .when("/editprofile", {
                templateUrl: "views/users/edit_profile.view.html",
                controller:  "EditProfileController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller:  "SearchController"
            })
            .when("/quiz", {
                templateUrl: "views/quiz/quiz.view.html",
                controller:  "QuizController"
            })
        ;
    }
})();