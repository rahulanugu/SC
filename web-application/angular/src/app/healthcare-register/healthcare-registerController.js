var app = angular.module('myApp');
app.controller('registerController', function ($scope) {
   /*
   * This method will be called on click event of button.
   */
   $scope.postData = function () {
   
       var user = $.param({
           data: JSON.stringify({
               firstName: $scope.firstName,
               lastName: $scope.lastName,
               email: $scope.email,
               phone: $scope.phone,
               companyName: $scope.companyName,
               roleInCompany: $scope.roleInCompany,
               password: $scope.password
            })
       });

       $http.post("/api/data/", user).success(function(user, status) {
        console.log('Data posted successfully');
       })
    }
   }); 