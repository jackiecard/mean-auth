/**
 * Created by jackie on 6/14/16.
 */
angular.module('myApp').factory('ProfileService',
    ['$http',
        function ($http) {

            return {
                getProfile : function(username) {
                    return $http.get('/user/profile/' + username);
                },

                register : function(profile) {
                    return $http.post('/user/profile/', profile);
                }
            }

        }]);