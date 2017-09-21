app.controller('addCourseController', function ($scope, httpService, $window, $rootScope, $location) {
    init();
    function init()
    {
        if (!$rootScope.isLogin)
        {
            var r = confirm("You are not logged in. Please ok to login and continue or cancel to go back. ");
            if (r == true) {
                $('#loginPopup').modal('show');
            }
            else
            {
                $location.path("/");
            }
        }
        $window.scrollTo(0, 0);
        $scope.course = {};
        $scope.subCourseIndicator = false;
        $scope.sub_course = {};
        $scope.subCourseIndicator = false;
        $scope.subCourseLength = null;
        $rootScope.loaderIndicator = false;
        $scope.successMessage = "";
        $scope.errorIndicator = false;
        getCourse();
    }

    $scope.addSubCoursesTextBox = function () {
        if ($scope.subCourseLength > 0) {
            $scope.subCourseIndicator = true;

            $scope.sub_course = [];
            
            for (var i = 0; i < $scope.subCourseLength; i++) {

                $scope.sub_course[i] = [];
                
                $scope.sub_course[i].name = "";
               

            }
        }
    }
    $scope.addCourse = function () {
        $scope.addCourseForm.$setSubmitted(true);
        if ($scope.addCourseForm.$valid) {
            $scope.course.sub_course = $scope.sub_course;
            for (var i = 0; i < $scope.sub_course.length; i++) {
                $scope.course.sub_course[i] = $scope.sub_course[i].name;
            }
            $rootScope.loaderIndicator = true;
            httpService.createCourse($scope.course).then(function (data) {
                //console.log($scope.course);
                $scope.errorIndicator = false;
                $scope.successMessage = "Group and its courses added successfully.";
                init();
                $scope.addCourseForm.$setPristine();
                $rootScope.loaderIndicator = false;
            });
        }
        else {
            $scope.errorIndicator = true;
            $scope.errorMessage = "please enter required details."
        }
    }
    function getCourse()
    {
        
        httpService.getCourse().then(function (response) {
            
            $scope.CourseMenu = response.data.data;
            //console.log(JSON.stringify($scope.CourseMenu));

        });
    }
    $scope.deleteSubCourse = function (data, subcourseid)
    {
        if (data.sub_course.length == 1) //delete if only one course lasts 
        {
            var r = confirm("If you delete one only existed course of this group then course and group both will also get deleted. Are you sure ?");
            if (r == true) {
                $rootScope.loaderIndicator = true;
                httpService.deleteGroup(data.main_course_id).then(function () {
                    getCourse();
                    $rootScope.loaderIndicator = false;
                });
            }
        }
        else {
           // var course = "main_course_id=" + data.main_course_id + "&sub_course_id=" + subcourseid;
            $rootScope.loaderIndicator = true;
            httpService.deleteSubCourse(data.main_course_id, subcourseid).then(function () {
                alert("course deleted successfully");
                $rootScope.loaderIndicator = false;
                getCourse();
            });
        }
    }

    $scope.deleteGroup = function(data)
    {
       
        var r = confirm("If you delete a group then its courses will also get deleted. Are you sure ?");
        if (r == true) {
            $rootScope.loaderIndicator = true;
            httpService.deleteGroup(data.main_course_id).then(function (response) {
                console.log(JSON.stringify(response.data));
                getCourse();
                $rootScope.loaderIndicator = false;
            });
        } 
        
    }
    $scope.cancelAddCourse = function()
    {
        $scope.course = {};
        $scope.subCourseLength = undefined;
        $scope.sub_course = [];
        $scope.subCourseIndicator = false;
    }
});
