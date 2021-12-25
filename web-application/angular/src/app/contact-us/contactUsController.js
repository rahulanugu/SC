var app = angular.module('myApp', []);
app.controller('contactUsController', function ($scope) {
   /*
   * This method will be called on click event of button.
   */
   $scope.postData = function () {
   
       var data = $.param({
           contact: JSON.stringify({
               fname: $scope.fname,
               lname: $scope.lname,
               email: $scope.email,
               message: $scope.message
           })
       });

       $http.post("/api/contact", data).success(function(data,status) {
           console.log('Data posted successfully');
       })
    }
   }); 