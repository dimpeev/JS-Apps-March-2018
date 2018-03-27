function result() {
    const URL = "https://baas.kinvey.com/appdata/kid_SkqRRwLqM/";
    const USERNAME = "admin";
    const PASSWORD = "password";
    const BASE_64 = btoa(USERNAME + ":" + PASSWORD);
    const AUTH_HEADERS = {
        Authorization: "Basic " + BASE_64
    };
    const POST_LIST = $("#posts");
    const COMMENT_SECTION = $("#post-comments");

    $("#btnLoadPosts").click(loadPosts);
    $("#btnViewPost").click(viewPost);

    function loadPosts() {
        $.ajax({
            method: "GET",
            url: URL + "posts",
            headers: AUTH_HEADERS
        }).then(function (posts) {
            POST_LIST.empty();
            for (let post of posts) {
                $(`<option value="${post._id}">${post.title}</option>`).appendTo(POST_LIST);
            }
        }).catch(function(err) {
            console.log(err);
        });
    }

    function viewPost() {
        let postId = POST_LIST.find(":selected").val();
        COMMENT_SECTION.empty();
        $.ajax({
            method: "GET",
            url: URL + `posts/${postId}`,
            headers: AUTH_HEADERS
        }).then(function(post) {
            $("#post-title").text(post.title);
            $("#post-body").text(post.body);
        }).catch(function(err) {
            console.log(err);
        });
        $.ajax({
            method: "GET",
            url: URL + `comments/?query={"post_id":"${postId}"}`,
            headers: AUTH_HEADERS
        }).then(function(comments) {
            for (let comment of comments) {
                $(`<li>${comment.text}</li>`).appendTo(COMMENT_SECTION);
            }
        }).catch(function(err) {
            console.log(err);
        });
    }
}