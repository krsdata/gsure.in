var app = angular.module('growSure', ['ngRoute', 'ui.bootstrap']);


app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "app/views/dashboard.html",
        controller: 'dashboardController'
    })
     .when("/about-us", {
        templateUrl: "app/views/about.html"
     })
        .when("/blogs", {
            templateUrl: "app/views/blog.html",
            controller: 'blogController'
        })
        .when("/blogs/:subCourseName/:subCourseId", {
            templateUrl: "app/views/blog.html",
            controller: 'blogController'
        })
         .when("/contact-us", {
             templateUrl: "app/views/contact.html",
             controller : 'contactUsController'
         })
        .when("/add-course-detail", {
            templateUrl: "app/views/addCourseDetail.html",
            controller: "addCourseDetailCtrl"
        })
        .when("/add-course", {
            templateUrl: "app/views/addCourse.html",
            controller : 'addCourseController'
        })
        .when("/add-blog", {
            templateUrl: "app/views/create-blog.html",
            controller: 'addBlogController'
        })
         .when("/course-detail/:subCourseName/:subCourseId", {
             templateUrl: "app/views/courseDetail.html",
             controller: 'courseDetailCtrl'
         })
    .otherwise({
        redirect: '/'
    });
});

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});