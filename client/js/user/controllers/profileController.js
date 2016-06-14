/**
 * Created by jackie on 6/14/16.
 */
angular.module('myApp').controller('profileController',
    ['$scope', '$location', 'ProfileService', '$routeParams',
        function ($scope, $location, ProfileService, $routeParams) {

            $scope.saveBtn = false;

            $scope.form = "disabled";

            $scope.profile = {};

            $scope.username = $routeParams.username;

            ProfileService.getProfile($scope.username)
                .then(function(response) {
                    $scope.profile = response.data;
                });

            $scope.edit = function(){

                $scope.saveBtn = true;

                if($scope.form = "disabled")
                    $scope.form = "";
                else
                    $scope.form = "disabled";
            }

        }]);