var app = angular.module('main');
app.controller('loginCtrl', function($scope, $http){
    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            url: window.location.href +'loginController.php',
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username='+username+'&password='+password
        }).then(function(response){
            console.log(response.data);
        })
    }
});