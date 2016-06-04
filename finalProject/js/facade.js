/**
 * Created by Irayt1063
 *              on 4/14/2016.
 */



function loginIntoAccount(){
    var username = $("#txtLoginUsername").val();
    var password= $("#txtLoginPassword").val();
    var successLogin = false;
    var options = [username];
    if (username.trim == "" || password == "") {
        alert("Please enter username and password")
    }
    else{
        function successSelect(tx, results){
            console.info(results.rows.length);
            if(results.rows.length == 0){
                alert("Username or password is incorrect");
            }
            else{
                var row = results.rows[0];
                if (password == row['password']) {
                    successLogin = true;
                    localStorage.setItem("UserId", row['id']);
                    window.location.href = "#photosPage";
                    $("#txtLoginUsername").val("");
                    $("#txtLoginPassword").val("");
                }
                else{
                    alert("Username or password is incorrect");
                }
            }

        }
        User.select(options, successSelect);
    }

}

function addPhoto(){
    //validations
    var nameCheck = $("#txtNewPhotoName").val();
    if(nameCheck.trim() != ""){
        var name = $("#txtNewPhotoName").val();
        var description = $("#txtNewDescription").val();
        var owner = localStorage.getItem("UserId");
        var private = $("#chkNewPrivate").prop('checked');
        var place;
        var photo;

        var options = [name, owner, description, place, private, photo];
        console.info(options);

        Photo.insert(options);

        window.location.href="#photosPage";
    }
    else{
        alert("Please enter photo name");
    }

}

function showFeed(tx, results){
    var htmlCode="";
    var username = [];
    var timesHasBeenCalled = 0;
    var feedCount = 0;
    var hasBeenCalled = false;


    function successUserSelect(tx, resultsUser){
        var rowUser = resultsUser.rows[0];
        username.push(rowUser['username']);
        timesHasBeenCalled++;
        if(timesHasBeenCalled == feedCount){

            addPhotosToHTML();

        }

    }
    function addPhotosToHTML(){
        var count = 0;
        for(var i=results.rows.length-1; i > -1; i--){
            var row = results.rows[i];

            if(row['private'] == "false" || row['private'] == null){
                htmlCode += "<div id='feed'><p class='photoOwnerName'>" + username[count] + "</p>" +
                    "<img src='" + row['photo']+"' class='photoFile'>" +
                    "<p class='photoName'>" + row['name'] + "</p>" +
                    "<p class='photoDescription'>" + row['description'] + "</p>" +
                    "<a href='#commentPage' class='commentLink'" +
                    "data-photo-comment-id='" + row['id']+"'>View and Add Comments</a></div>";
                count++;
            }
        }
        var sc = $("#photoFeed");
        sc = sc.html(htmlCode);
        $("#feed a").on("click", clickHandler);

        function clickHandler(){
            localStorage.setItem("photoId", $(this).attr("data-photo-comment-id"));
            window.location.href = "#commentPage";
        }
    }

    function callSelect(){
        User.selectId(options, successUserSelect);
    }

    for(var i=results.rows.length-1; i > -1; i--){
        var row = results.rows[i];
        var options = [row['ownerId']];
        if(row['private'] == "false" || row['private'] == null){
            feedCount++;
            callSelect();
        }
    }
}

function successCommentSelect(tx, results){

    var htmlCode = "";
    var username =[];
    var timesHasBeenCalled = 0;
    var feedCount = 0;
    $("#commentsSection").empty();

    function successUserSelect(tx, resultsUser){
        var rowUser = resultsUser.rows[0];
        username.push(rowUser['username']);
        console.info(timesHasBeenCalled, feedCount);
        timesHasBeenCalled++;
        if(timesHasBeenCalled == feedCount){
            console.info("calling HTML");
            addCommentsToHTML();
        }
    }
    function addCommentsToHTML(){
        var count = 0;
        for(var i = 0; i <results.rows.length; i++){
            var row = results.rows[i];
            if(row['ownerId'] == localStorage.getItem("UserId")){
                htmlCode+="<ul>";
                htmlCode += "<li id='commentArea'>" + "<img src='images/delete.png' class='btnDeleteComment'" +
                    "data-row-comment-id='" +row['id'] + "'>"+
                    "<p class='commentOwnerName'>" + username[count] + "</p>" +
                    "<p class='commentText'>" + row['text'] + "</p>" +
                    "</li>";
                htmlCode+="</ul>";
            }
            else{
                htmlCode += "<li id='commentArea'>" +
                    "<p id='photoOwnerName'>" + username[count] + "</p>" +
                    "<p id='commentText'>" + row['text'] + "</p></li>"
            }
            count++;
        }
        var sc = $("#commentsSection");
        sc = sc.html(htmlCode);
        $("#commentArea img").on("click", clickHandler)

        function clickHandler(){
            var commentId = $(this).attr("data-row-comment-id");
            var options = [commentId];
            Comment.delete(options);
            loadComments();
        }

    }
    function callUserSelect(){
        console.info(options);
        User.selectId(options, successUserSelect);

    }

    for(var i =0; i<results.rows.length; i++){

        var row = results.rows[i];
        console.info(row);
        var options = [row['ownerId']];
        feedCount++;
        callUserSelect();
    }

}

function addComment(){
    var commentText = $("#txtNewComment").val();
    if(commentText.trim() != ""){
        $("#txtNewComment").val("");
        var photoId = localStorage.getItem("photoId");
        var ownerId = localStorage.getItem("UserId");
        var options = [photoId, ownerId, commentText];
        Comment.insert(options);
        loadComments();
    }
}

function showAllUsers(tx, results){
    var htmlCode ="";
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows[i];
        if(row['id'] == localStorage.getItem("UserId")){

        }
        else{
            htmlCode += "<ul>";
            htmlCode += "<li><a data-tole='button' class='btnOtherUser' data-row-id='" + row['id'] +
                    "' href='#'> <img class='otherUserPhoto'src='" + row['photo']+"'>" +
                    "<p class='otherUserName'>" + row['username'] + "</p>" +
                    "<p class='otherUserFullName'>" +row['firstName'] + " "+ row['lastName']+"</p>" +
                    "</a></li>";
            htmlCode += "</ul>";
        }
    }
    var lv = $("#allUsers");
    lv = lv.html(htmlCode);
    $("#allUsers a").on("click", clickHandler)

    function clickHandler(){
        localStorage.setItem("otherUserId", $(this).attr("data-row-id"));
        window.location.href = "#otherUserPage";
    }
}

function successSelfShow(tx, results){

    var row= results.rows[0];
    console.info(row);
    $("#txtUserFirstNameInfo").html(row['firstName']);
    $("#txtUserLastNameInfo").html(row['lastName']);
    $("#txtUsernameInfo").html(row['username']);
    $("#userPhoto").attr("src", row['photo']);
}

function successSelfPhotoShow(tx, results){
    var htmlCode ="";
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows[i];
        htmlCode += "<div class='feedUSer'>" +
            "<img src='" + row['photo']+"' class='photoFile'>" +
            "<p class='photoName'>" + row['name'] + "</p>" +
            "<p class='photoDescription'>" + row['description'] + "</p>" +
            "<a href='#commentPage' class='commentLink'" +
            "data-photo-comment-id='" + row['id']+"'>View and Add Comments</a></div>";
    }
    var sc = $("#userPhotoGrid");
    sc = sc.html(htmlCode);
    $("#feed a").on("click", clickHandler);

    function clickHandler(){
        localStorage.setItem("photoId", $(this).attr("data-photo-comment-id"));
        window.location.href = "#commentPage";
    }
}

function successUserSearch(tx, results){
    var htmlCode = "";
    console.info(results.rows);
    for (var i = 0; i < results.rows.length; i++) {
        var row=results.rows[i];
        console.info(row);
        if(row['id'] == localStorage.getItem("UserId")){

        }
        else{
            htmlCode += "<ul>";
            htmlCode += "<li><a data-tole='button' class='btnOtherUser' data-row-id='" + row['id'] +
                "' href='#'> <img class='otherUserPhoto'src='" + row['photo']+"'>" +
                "<p class='otherUserName'>" + row['username'] + "</p>" +
                "<p class='otherUserFullName'>" +row['firstName'] + " "+ row['lastName']+"</p>" +
                "</a></li>";
            htmlCode += "</ul>";
        }

    }
    var lv = $("#allUsers");
    lv = lv.html(htmlCode);
    $("#allUsers a").on("click", clickHandler)

    function clickHandler(){
        localStorage.setItem("otherUserId", $(this).attr("data-row-id"));
        window.location.href = "#otherUserPage";
    }
}

function successOtherPhotoUserShow(tx, results){
    var htmlCode ="";
    for (var i = 0; i < results.rows.length; i++) {
        var row = results.rows[i];
        if(row['private'] == "false"){
            htmlCode += "<div class='feedUSer'>" +
                "<img src='" + row['photo']+"' class='photoFile'>" +
                "<p class='photoName'>" + row['name'] + "</p>" +
                "<p class='photoDescription'>" + row['description'] + "</p>" +
                "<a href='#commentPage' class='commentLink'" +
                "data-photo-comment-id='" + row['id']+"'>View and Add Comments</a></div>";
        }

    }
    var sc = $("#otherUserPhotoGrid");
    sc = sc.html(htmlCode);
    $("#feed a").on("click", clickHandler);

    function clickHandler(){
        localStorage.setItem("photoId", $(this).attr("data-photo-comment-id"));
        window.location.href = "#commentPage";
    }
}

function successOtherUserShow(tx, results){
    var row= results.rows[0];
    $("#txtOtherUserFirstNameInfo").html(row['firstName']);
    $("#txtOtherUserLastNameInfo").html(row['lastName']);
    $("#txtOtherUsernameInfo").html(row['username']);
    $("#imgOtherUser").attr("src", row['photo']);
}

function successSettingsShow(tx, results){
    var row = results.rows[0];
    $("#txtNewUserFirstName").val(row['firstName']);
    $("#txtNewUserLastName").val(row['lastName']);
    $("#txtNewUsername").val(row['username']);
    $("#txtNewEmail").val(row['email']);
}



function resetPassword(){
    var id = localStorage.getItem("UserId");
    var password = $("#txtNewPassword").val();
    var options = [password, id];
    User.changePassword(options);
    window.location.href = "#userSettingsPage";
}

