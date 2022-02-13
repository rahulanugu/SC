// Stephanie - created entire file for controller

app.controller('careersController', function ($scope, $http) {

  $scope.postJobPosting = function () {
    var request = $http({
        method: "post",
        url: window.location.href + "careersController.php",
        data: {
            title: $scope.title,
            description: $scope.description,
            salary: $scope.salary,
            location: $scope.location,
            email: $scope.email,
            category: $scope.category,
            link: $scope.link,
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  $scope.getJobPosting = function () {
    var request = $http({
        method: "get",
        url: window.location.href + "careersController.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
 }

  $scope.getJobPostingByCategory = function () {
    var request = $http({
        method: "get",
        url: window.location.href + "careersController.php",
        data: {
          category: $scope.category
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  $scope.postJobCategory = function () {
    var request = $http({
        method: "post",
        url: window.location.href + "careersController.php",
        data: {
          title: $scope.title,
          description: $scope.description
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  scope.getJobCategories = function () {
    var request = $http({
        method: "get",
        url: window.location.href + "careersController.php",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  $scope.getJobPostingByID = function () {
    var request = $http({
        method: "get",
        url: window.location.href + "careersController.php",
        data: {
          jobid: $scope.jobid
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
  });
