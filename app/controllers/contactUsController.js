app.controller('contactUsController', function ($scope, httpService, $rootScope) {
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.errorIndicator = false;
    $scope.successMessage = '';
    $scope.contactUs = function () {
        $scope.contactusForm.$setSubmitted(true);
        if ($scope.contactusForm.$valid) {
            $rootScope.loaderIndicator = true;
            httpService.contactUs($scope.user).then(function (data) {
                $scope.errorIndicator = false;
                $rootScope.loaderIndicator = false;
                $scope.successMessage = "Thank you for contacting us. Enquiry submitted. we will contact soon.";
                $scope.user = {};
                $scope.contactusForm.$setPristine()
            })
           
        }
        else {
            if ($scope.contactusForm.$error.email) {
                $scope.errorIndicator = true;
                $scope.errorMessage = "Please enter valid email-id.";
            }
            else if ($scope.contactusForm.inputPhone.$error.maxlength || $scope.contactusForm.inputPhone.$error.minlength)
            {
                $scope.errorIndicator = true;
                $scope.errorMessage = "Please enter valid phone number.";
            }
            else {
                $scope.errorIndicator = true;
                $scope.errorMessage = "Please enter required details.";
            }

        }
    }
});