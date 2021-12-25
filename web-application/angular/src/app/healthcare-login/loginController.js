var app = angular.module('main');
app.controller('loginCtrl', function($scope, $http){
    $scope.login = function() {
        var data = $.param({
            User: JSON.stringify({
                username: $scope.username,
                password: $scope.password
            })
        });
        $http.post("/api/User/", data).success(function(data, status) {
            console.log('Data posted successfully');
         })
      }
   });