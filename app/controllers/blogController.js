app.controller('blogController', function ($scope, $window, httpService, $routeParams) {
    init();
    function init()
    {
        $window.scrollTo(0, 0);
        if ($routeParams.subCourseId) {
            var subcourseid = $routeParams.subCourseId;
            getBlogBySubCourseID(subcourseid);
        }
        else {
            getBlogList();
        }
        $scope.currentPage = 1;
        $scope.numPerPage = 3;
        $scope.maxSize = 3;
        getCourse();
    }
    
    function getBlogList()
    {
        httpService.getBlogList().then(function (response) {
            $scope.blogList = response.data.data;
            if ($scope.blogList.length <= 10)
                $scope.blogSize = 11;
            else
            {
                $scope.blogSize = $scope.blogList.length;
            }
            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                if ($scope.blogList.length > 0)
                $scope.filteredBlogList = $scope.blogList.slice(begin, end);
                //getShowMore();

            });
        });
    }

    function getBlogBySubCourseID(subcourseid) {
        httpService.getBlogBySubCourseID(subcourseid).then(function (response) {
            $scope.blogList = response.data.data;
            //if ($scope.blogList.length <= 10)
            //    $scope.blogSize = 11;
            //else {
                $scope.blogSize = $scope.blogList.length;
            //}
            $scope.$watch("currentPage + numPerPage", function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
                if ($scope.blogList.length > 0)
                $scope.filteredBlogList = $scope.blogList.slice(begin, end);
            });
        });
    }
   
    function getCourse() {
       httpService.getCourse().then(function (response) {
          $scope.CourseMenu = response.data.data;
        });
   }
    
});