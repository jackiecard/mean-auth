/**
 * Created by jackie on 6/14/16.
 */
angular.module('myApp').controller('logoutController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.status = "";

            AuthService.getUserStatus()
                .then(function(){
                    if (!AuthService.isLoggedIn()){
                        $scope.status = "Sign In";
                    }
                    else{
                        $scope.status = "Logout";
                    }
                });

            $scope.log = function (status) {

                if(status == "Logout"){
                    AuthService.logout()
                        .then(function () {
                            $location.path('/login');
                        });
                }
                else{
                    $location.path('/login');
                }

            };

        }]);