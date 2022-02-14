// Stephanie - created entire file for controller

app.controller('caregiverController', function ($scope, $http) {
  $scope.postCaregiverData = function () {

      var request = $http({
          method: "post",
          url: window.location.href + "caregiverController.php",
          data: {
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              email: $scope.email,
              message: $scope.message,
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

   }
  });
