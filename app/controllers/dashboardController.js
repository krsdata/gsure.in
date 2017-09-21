app.controller('dashboardController', function ($scope, httpService) {

    init();

    function init()
    {
        getCourse();
        $scope.courses = [];
    }

    function getCourse() {
        //get course
        httpService.getCourse().then(function (response) {

            $scope.CourseMenu = response.data.data;
            if ($scope.CourseMenu.length) {
                for (var i = 0; i < $scope.CourseMenu.length; i++) {
                    for (var j = 0; j < $scope.CourseMenu[i].sub_course.length ; j++) {
                        $scope.courses.push($scope.CourseMenu[i].sub_course[j].name);
                        var item = {};
                        item.name = $scope.CourseMenu[i].sub_course[j].name;
                        item.id = $scope.CourseMenu[i].sub_course[j].sub_course_id;
                        $scope.courses.push(item);
                    }
                }
            }
        });
    }
    $scope.isUndefined = function(item)
    {
        if(angular.isUndefined(item) || item == "" || item == null)
        return true;
        else
        return false;
    }
});
