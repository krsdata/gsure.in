app.controller('leftNavigationCtrl', function ($scope, $rootScope, httpService, $location) {

    init();

    function init()
    {
        $scope.user = {};
        $rootScope.isLogin = false;
        $scope.getCourse = getCourse;
        getCourse();
    }
  
    $scope.login = function()
    {
        $scope.loginForm.$setSubmitted(true);
        if ($scope.loginForm.$valid) {
            if ($scope.user.email == 'growsure@yahoo.com' && $scope.user.password == "growsure123$") {
                $rootScope.isLogin = true;
                //console.log($rootScope.isLogin);
                $scope.user = {};
                alert("logged in successfully");
                $('#loginPopup').modal('toggle');
            }
            else {
                $scope.message = "Email-id do not exist in system. Please contact administrator at 9424425010";
                $scope.errorMessageIndicator = true;
            }
        }
        else {
            $scope.message = "Please enter required fields";
            $scope.errorMessageIndicator = true;
        }
    }
    $scope.hideMenu = function()
    {
        $("#coursesMenu").css({ display: "none" });
    }
    $scope.checkEmail = function() {
        if ($scope.loginForm.$error.email) {
            $scope.emailIndicator = true;
            $scope.errorMessageIndicator = false;

        }
        else
            $scope.emailIndicator = false;
    }
    $scope.openLoginPopup = function()
    {
        $('#loginPopup').modal('show');
    }

    $scope.closeLoginPopup = function()
    {
        $('#loginPopup').modal('hide');
        var path = $location.path();
        if (path == "/add-course" || path == "/add-course-detail")
            $location.path("/");
    }

    function getCourse() {

        httpService.getCourse().then(function (response) {
            $scope.CourseMenu = response.data.data;
        });
    }
});