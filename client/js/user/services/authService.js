/**
 * Created by jackie on 6/14/16.
 */
angular.module('myApp').factory('AuthService',
    ['$q', '$timeout', '$http', '$localStorage',
        function ($q, $timeout, $http, $localStorage, $scope) {

            // create user variable
            var user = null;

            function isLoggedIn() {
                if(user) {
                    return true;
                } else {
                    return false;
                }
            }

            function getUserStatus() {
                return $http.get('/user/status')
                    // handle success
                    .success(function (data) {
                        if(data.status){
                            user = true;
                        } else {
                            user = false;
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                    });
            }

            function setUsername(username){
                $localStorage.userCred = username;
            }

            /*function getUsername(){
                $scope.usernameAuth = $localStorage.userCred;
                console.log($scope.usernameAuth);
                return $scope.usernameAuth;
            }*/

            function login(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/login',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            user = true;

                            setUsername(username);

                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function logout() {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a get request to the server
                $http.get('/user/logout')
                    // handle success
                    .success(function (data) {
                        user = false;
                        deferred.resolve();
                    })
                    // handle error
                    .error(function (data) {
                        user = false;
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            function register(username, password) {

                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post('/user/register',
                    {username: username, password: password})
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });

                // return promise object
                return deferred.promise;

            }

            // return available functions for use in the controllers
            return ({
                isLoggedIn: isLoggedIn,
                getUserStatus: getUserStatus,
                login: login,
                logout: logout,
                register: register
            });

        }]);