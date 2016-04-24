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
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }

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
                controller:  "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/form-fields.view.html",
                controller:  "FieldController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller:  "FormController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller:  "AdminController",
                resolve: {
                    loggedin: checkAdmin
                }
            });
    }
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                $rootScope.loggedIn = true;
                $rootScope.isAdmin = _.contains(user.roles, 'admin');
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                $rootScope.loggedIn = true;
                $rootScope.isAdmin = _.contains(user.roles, 'admin');
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                $rootScope.loggedIn = true;
                $rootScope.isAdmin = _.contains(user.roles, 'admin');
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();