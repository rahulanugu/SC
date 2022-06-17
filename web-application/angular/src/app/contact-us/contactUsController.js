var app = angular.module('myApp', []);
app.controller('contactUsController', function ($scope) {
   /*
   * This method will be called on click event of button.
   */
<<<<<<< HEAD
    $scope.data = {};
    $scope.submit = function () {
        console.log('clicked submit')
        $http({
            url:'http://localhost:4200/contact-us',
            method: 'POST',
            data: $scope.data,

        }).then(function(httpResponse){
            console.log('response:', httpResponse);
        })
    }
});
//        var data = $.param({
//            contact: JSON.stringify({
//                fname: $scope.fname,
//                lname: $scope.lname,
//                email: $scope.email,
//                message: $scope.message
//            })
//        });

//        $http.post("/node", data).success(function(data,status) {
//            console.log('Data posted successfully');
//        })
//     }
//    }); 
=======
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
>>>>>>> development-environment
