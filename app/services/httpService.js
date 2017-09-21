app.factory('httpService', ['$http', function ($http) {

    var serviceBase = 'http://webpedialab.com/growsure/';
    //var serviceBase = CONSTANTS.ENVIORNMENT.LOCAL + '/';
    var httpService = {
        contactUs: contactUs,
        createCourse: createCourse,
        getCourse: getCourse,
        createCourseDetails: createCourseDetails,
        deleteSubCourse: deleteSubCourse,
        deleteGroup: deleteGroup,
        getCourseDetail: getCourseDetail,
        createBlog: createBlog,
        getBlogList: getBlogList,
        deleteBlog: deleteBlog,
        updateBlog: updateBlog,
        getBlogBySubCourseID: getBlogBySubCourseID
    };

    function contactUs(user) {
        return $http.post(serviceBase + 'api/v1/contactus', user, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    function createCourse(course) {
        return $http.post(serviceBase + 'api/v1/createCourse', course, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function deleteSubCourse(maincourseid, subcourseid ) {
        return $http.post(serviceBase + 'api/v1/courseDetail/delete/' + maincourseid + '/' + subcourseid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    function deleteGroup(courseid) {
        return $http.post(serviceBase + 'api/v1/course/delete/' + courseid, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    

    function createCourseDetails(course) {
        return $http.post(serviceBase + 'api/v1/createCourseDetails', course, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    function createBlog(blog) {
        return $http.post(serviceBase + 'api/v1/blog/create', blog, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }
    function getCourse() {
        return $http.get(serviceBase + 'api/v1/getCourse', { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function getCourseDetail(subcourseid) {
        return $http.get(serviceBase + 'api/v1/getCourseDetail/' + parseInt(subcourseid), { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getBlogList() {
        return $http.get(serviceBase + 'api/v1/getBlog', { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function getBlogBySubCourseID(id) {
        return $http.get(serviceBase + 'api/v1/getBlog?blog_course_id='+ id, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });
    }

    function deleteBlog(id) {
        return $http.post(serviceBase + 'api/v1/blog/delete/' + id, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    function updateBlog(blog) {
        return $http.post(serviceBase + 'api/v1/blog/update/' + blog.id, blog,  { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            return response;
        });

    }

    return httpService;


}]);