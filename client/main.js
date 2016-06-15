var myApp = angular.module('myApp', ['ngRoute', 'ngStorage']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home.html',
            access: {restricted: true}
        })
        .when('/login', {
            templateUrl: 'partials/user/login.html',
            controller: 'loginController',
            access: {restricted: false}
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true}
        })
        .when('/register', {
            templateUrl: 'partials/user/register.html',
            controller: 'registerController',
            access: {restricted: false}
        })
        .when('/profile/:username', {
            templateUrl: 'partials/user/profile.html',
            controller: 'profileController',
            access: {restricted: true}
        })
        .otherwise({
            redirectTo: '/'
        });
})

.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function(){
                    if (next.access.restricted && !AuthService.isLoggedIn()){
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});