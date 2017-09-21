app.controller('addBlogController', function ($scope, httpService, $window, $filter) {
    init();
    function init()
    {
        getCourse();
        $scope.errorMessage = "";
        $scope.errorIndicator = false;
        $window.scrollTo(0, 0);
        $scope.blog = {};
        $scope.addBlogIndicator = false;
        $scope.listBlogIndicator = false;

    }

    function getCourse() {
        httpService.getCourse().then(function (response) {
            $scope.courseMenu = response.data.data;
        });
    }
    $scope.selectSubCourseMenu = function () {
        $scope.subCourseMenu = [];
        for (var i = 0; i < $scope.courseMenu.length; i++) {
            if ($scope.blog.blog_group_id == $scope.courseMenu[i].main_course_id) {
                $scope.blog.blog_group = $scope.courseMenu[i].main_course;
                $scope.subCourseMenu = $scope.courseMenu[i].sub_course;
            }
        }
    }

    $scope.createBlog = function () {
        $scope.addBlogForm.$setSubmitted(true);
        if ($scope.addBlogForm.$valid) {
            $scope.blog.blog_submission_date = getDate();
            for (var i = 0; i < $scope.subCourseMenu.length; i++) {
                if ($scope.blog.blog_course_id == $scope.subCourseMenu[i].sub_course_id) {
                    $scope.blog.blog_course = $scope.subCourseMenu[i].name;
                }
            }
            httpService.createBlog($scope.blog).then(function (response) {
                if (response.data.code == 200) {
                    $scope.blog = {};
                    $window.scrollTo(0, 0);
                    $scope.errorIndicator = false;
                    $scope.successMessage = "Blog created successfully.";
                }
            });
         }
        else {
            $scope.errorIndicator = true;
            $scope.errorMessage = "Please enter required details."
        }
    }

    $scope.cancelBlog = function()
    {
        $scope.blog = {};
        $scope.errorMessage = "";
        $scope.errorIndicator = false;
    }


    $scope.showAddBlogSection = function()
    {
        $scope.addBlogIndicator = true;
        $scope.listBlogIndicator = false;
        $scope.createBlogIndicator = true;
        $scope.updateBlogIndicator = false;
    }

    $scope.listBlogSection = function()
    {
        $scope.listBlogIndicator = true;
        $scope.addBlogIndicator = false;
        getBlogList();
    }
    function getBlogList() {
        httpService.getBlogList().then(function (response) {
            $scope.blogList = response.data.data;
        });
    }

    $scope.deleteBlog = function(item)
    {
        var r = confirm("Are you sure you want to delete this blog ?");
        if (r == true) {
            httpService.deleteBlog(item.id).then(function (response) {
                getBlogList();
            });
        }
    }

    $scope.getBlogDetails = function(item)
    {
        $scope.createBlogIndicator = false;
        $scope.updateBlogIndicator = true;
        $scope.addBlogIndicator = true;
        $scope.listBlogIndicator = false;
        $scope.blog = {};
        $scope.blog = item;
        $scope.errorIndicator = false;
        $scope.successMessage = "";
        $scope.selectSubCourseMenu();
    }

    $scope.updateBlog = function()
    {
        $scope.addBlogForm.$setSubmitted(true);
        if ($scope.addBlogForm.$valid) {
            $scope.blog.blog_submission_date = getDate();

            for (var i = 0; i < $scope.subCourseMenu.length; i++) {
                if ($scope.blog.blog_course_id == $scope.subCourseMenu[i].sub_course_id) {
                    $scope.blog.blog_course = $scope.subCourseMenu[i].name;
                }
            }
            httpService.updateBlog($scope.blog).then(function (response) {
                if (response.data.code == 200) {
                    $scope.blog = {};
                    $window.scrollTo(0, 0);
                    $scope.errorIndicator = false;
                    $scope.successMessage = "Blog updated successfully.";
                    alert("blog updated successlly");
                    $scope.listBlogIndicator = true;
                    $scope.addBlogIndicator = false;
                    getBlogList();
                }
            });
        }
        else {
            $scope.errorIndicator = true;
            $scope.errorMessage = "Please enter required details."
        }
    }

    function getDate()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '/' + mm + '/' + yyyy;
        return today;

    }
});