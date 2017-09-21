app.controller('courseDetailCtrl', function ($scope, httpService, $window, $routeParams, $rootScope) {
    init();
    function init()
    {
        $window.scrollTo(0, 0);
        $rootScope.loaderIndicator = true;
      //getcourse
        getCourse();
        $scope.courseDetailIndicator = true;
      //getcoursedetail 
        getCourseDetail();
        $scope.contactUsIndicator = false;

    }

    function getCourse() {

        httpService.getCourse().then(function (response) {
            $scope.CourseMenu = response.data.data;
           
        });
    }

    function getCourseDetail() {

        var subcourseid = $routeParams.subCourseId;
        httpService.getCourseDetail(subcourseid).then(function (response) {

            $scope.course = response.data.data;
            if (response.data.data.general_info != null)
                $scope.courseDetailIndicator = true;
            //console.log(JSON.stringify($scope.course));
            if ($scope.course.general_info)
            {
                $scope.course.general_info = JSON.parse($scope.course.general_info);
            }
            $rootScope.loaderIndicator = false;
        });
    }

    $scope.applyForCourse = function()
    {
        $scope.contactUsIndicator = true;
    }
});