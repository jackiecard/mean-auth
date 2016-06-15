/**
 * Created by jackie on 6/14/16.
 */
angular.module('myApp').controller('profileController',
    ['$scope', '$location', 'ProfileService', '$routeParams', '$localStorage', 'AuthService', '$route',
        function ($scope, $location, ProfileService, $routeParams, $localStorage, AuthService, $route) {

            $scope.saveBtn = false;

            $scope.form = "disabled";

            $scope.profile = {};

            $scope.username = $routeParams.username;

            $scope.emptyProfile = false;

            ProfileService.getProfile($scope.username)
                .then(function(response) {

                    if($scope.username != $localStorage.userCred) {
                        alert("Access Denied!");
                        AuthService.logout().then(function () {
                            $location.path('/login');
                        });
                    }

                    $scope.profile = response.data;

                    if($scope.profile == null)
                        $scope.emptyProfile = true;

                });

            $scope.edit = function(){
                $scope.saveBtn = true;

                if($scope.form = "disabled")
                    $scope.form = "";
                else
                    $scope.form = "disabled";
            }

            $scope.save = function () {

                $scope.profile.username = $scope.username;
                if($scope.emptyProfile){
                    ProfileService.register($scope.profile)
                        .then(function(response) {
                            alert("Profile registered!");
                            $route.reload();
                        });
                }

                else {
                    ProfileService.update($scope.profile)
                        .then(function (response) {
                            alert("Profile updated!");
                            $route.reload();
                        });
                }
            }

        }]);