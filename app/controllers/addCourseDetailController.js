app.controller('addCourseDetailCtrl', function ($scope, httpService, $window, $rootScope, $location) {
    init();

    function init()
    {
        $scope.course = {};
        getCourse();
        $window.scrollTo(0, 0);
        $scope.errorIndicator = false;
        $rootScope.loaderIndicator = false;
        if (!$rootScope.isLogin) {
            var r = confirm("You are not logged in. Please ok to login and continue or cancel to go back. ");
            if (r == true) {
                $('#loginPopup').modal('show');
            }
            else {
                $location.path("/");
            }
        }
    }

    function getCourse() {
        httpService.getCourse().then(function (response) {
            $scope.courseMenu = response.data.data;
            

        });
    }

    $scope.selectSubCourseMenu = function()
    {
        $scope.subCourseMenu = [];
        for (var i = 0; i < $scope.courseMenu.length; i++)
        {
            if($scope.course.main_course_id == $scope.courseMenu[i].main_course_id)
            {
                $scope.subCourseMenu = $scope.courseMenu[i].sub_course;
            }
        }
    }

    $scope.addCourseDetail = function()
    {
        $scope.addCourseDetailForm.$setSubmitted(true);
        if ($scope.addCourseDetailForm.$valid) {
            $scope.courseDetail = {};
            $scope.courseDetail.main_course_id = $scope.course.main_course_id;
            $scope.courseDetail.sub_course_id = $scope.course.sub_course_id;
            $scope.courseDetail.description = $scope.course.description;
            $scope.courseDetail.course_duration = $scope.course.course_duration;
            //image
            var fd = new FormData();
           // var imgBlob = dataURItoBlob($scope.courseImage);
           // fd.append('file', imgBlob);
            $scope.courseDetail.image = $scope.courseImage;
            $scope.courseDetail.general_info = {
                course_prerequisites: $scope.course.course_prerequisites,
                training_highlights: $scope.course.training_highlights,
                chapter_name: $scope.course.chapter_name
            }
            $rootScope.loaderIndicator = true;
            //console.log(JSON.stringify($scope.courseDetail));
            httpService.createCourseDetails($scope.courseDetail).then(function (data) {
                $rootScope.loaderIndicator = false;
                $scope.successMessage = "Course detail added successfully."
                $scope.course = {};
                $window.scrollTo(0, 0);
                $scope.courseImage = "";

            });
        }
        else {
            $scope.errorIndicator = true;
            $scope.errorMessage = "Please enter required details.";
            $window.scrollTo(0, 0);
        }
    }

    $scope.onCancel = function()
    {
        $scope.course = {};
        $scope.errorIndicator = false;
         
    }

    $scope.getContentList = function()
    {
        //console.log($scope.courseContent);
    }
    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    }

    $scope.getSubCourseDetailsIfAny = function()
    {
        if ($scope.course.sub_course_id)
        {
            httpService.getCourseDetail($scope.course.sub_course_id).then(function (response) {

                //$scope.course = response.data.data;
                $scope.courseImage = response.data.data.image;
                $scope.course.description = response.data.data.description;
                $scope.course.course_duration = response.data.data.course_duration;
                if (response.data.data.general_info) {
                    $scope.course.general_info = JSON.parse(response.data.data.general_info);
                    $scope.course.course_prerequisites = $scope.course.general_info.course_prerequisites;
                    $scope.course.training_highlights = $scope.course.general_info.training_highlights;
                    $scope.course.chapter_name = $scope.course.general_info.chapter_name;
                }
            });
        }
    }
});

//your directive
app.directive("fileread", [
  function () {
      return {
          scope: {
              fileread: "="
          },
          link: function (scope, element, attributes) {
              element.bind("change", function (changeEvent) {
                  var reader = new FileReader();
                  reader.onload = function (loadEvent) {
                      scope.$apply(function () {
                          scope.fileread = loadEvent.target.result;
                      });
                  }
                  reader.readAsDataURL(changeEvent.target.files[0]);
              });
          }
      }
  }
]);
