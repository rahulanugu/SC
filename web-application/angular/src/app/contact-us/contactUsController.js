app.controller('contactUsController', function ($scope, $http) {
   /*
   * This method will be called on click event of button.
   */
   $scope.postData = function () {
   
       var request = $http({
           method: "post",
           url: window.location.href + "contactUsController.php",
           data: {
               fname: $scope.fname,
               lname: $scope.lname,
               email: $scope.email,
               message: $scope.message,
           },
           headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
       });
   
    }
   }); 