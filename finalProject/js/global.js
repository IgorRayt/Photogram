/**
 * Created by Irayt1063
 *              on 4/14/2016.
 */
var cameraready = false;

function btnCreateAccount_click(){
    createUser();
}

function btnLogin_click(){
    loginIntoAccount();
}

function imgAdd_click(){
    takePhoto();
}

function btnUploadNewPhoto_click(){
    addPhoto();
}

function imgBack_click(){
    console.info("GO TO PH");
    window.location.href = "#photosPage";
}

function photosPage_show(){
    showAllPhotosFeed();
    console.info("dsd");
}

function btnLogout_click(){
    logout();
}

function imgMenu_click(){
    window.location.href = "#userSettingsPage";
}

function commentPage_show(){
    loadComments();
}

function btnAddComment_click(){
    addComment();
}

function otherPhotosPage_show(){
    loadUsers();
}

function myPhotosPage_show(){
    showMyPage();
}

function imgSearch_click(){

}

function txtSearch_change(){
    searchUsers();
}

function otherUserPage_show(){
    showOtherUserPage();
}

function userSettingsPage_show(){
    showSettings();
}

function btnChangeUserSettings_show(){
    changeUserSettings();
}

function btnResetPassword_click(){
    changePassword();
}

function imgBackToLoginPage_click(){
    window.location.href = "#loginPage";
}

function imgBackToOtherPhotosPage_click(){
    window.location.href = "#otherPhotosPage";
}

function imgBackToPhotosPage_click(){
    window.location.href = "#photosPage";
}

function imgBackToUserPage_click(){
    window.location.href = "#myPhotosPage";
}

function imgBackToSettingsPage_click(){
    window.location.href = "#userSettingsPage";
}

function imgBackToSettingsPageFromAboutPage_click(){
    window.location.href = "#userSettingsPage";
}

function imgBackToPhotosPageFromComment_click(){
    window.location.href = "#photosPage";
}

function document_deviceready(){
    console.info("Device is ready");
    cameraready = true;
}

function userPhoto_click(){
    changeUserPhoto();
}

function btnTakeNewPhoto_click(){
    imgAdd_click();
}
function init() {
    $("#btnCreateAccount").on("click", btnCreateAccount_click);
    $("#btnLogin").on("click", btnLogin_click);

    $("#imgAdd").on("click", imgAdd_click);

    $("#imgBack").on("click", imgBack_click);

    $("#imgSearch").on("click", imgSearch_click);

    $("#btnUploadNewPhoto").on("click", btnUploadNewPhoto_click);

    $("#photosPage").on("pageshow", photosPage_show);

    $("#btnLogout").on("click", btnLogout_click);

    $("#imgMenu").on("click", imgMenu_click);

    $("#commentPage").on("pageshow", commentPage_show);

    $("#btnAddComment").on("click", btnAddComment_click);

    $("#otherPhotosPage").on("pageshow", otherPhotosPage_show);

    $("#myPhotosPage").on("pageshow", myPhotosPage_show);

    $("#txtSearch").on("input", txtSearch_change);

    $("#otherUserPage").on("pageshow", otherUserPage_show);

    $("#userSettingsPage").on("pageshow", userSettingsPage_show);

    $("#btnChangeUserSettings").on("click", btnChangeUserSettings_show);

    $("#btnResetPassword").on("click", btnResetPassword_click);

    $("#imgBackToLoginPage").on("click", imgBackToLoginPage_click);

    $("#imgBackToOtherPhotosPage").on("click", imgBackToOtherPhotosPage_click);

    $("#imgBackToPhotosPage").on("click", imgBackToPhotosPage_click);

    $("#imgBackToUserPage").on("click", imgBackToUserPage_click);

    $("#imgBackToSettingsPage").on("click", imgBackToSettingsPage_click)

    $("#imgBackToSettingsPageFromAboutPage").on("click", imgBackToSettingsPageFromAboutPage_click);

    $("#imgBackToPhotosPageFromComment").on("click", imgBackToPhotosPageFromComment_click);

    $("#userPhoto").on("click", userPhoto_click);

    $("#btnTakeNewPhoto").on("click",btnTakeNewPhoto_click);

    $(document).on("deviceready", document_deviceready);

}

function initDB(){
    console.info("Creating Database");
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating tables.");
            DB.createTables();
        }
        else{
            console.error("Error: cannot create tables - database not available!");
        }

    }
    catch (e){
        console.error("Error: (Fatal) Error in initDB(). can not proceed.");
    }
}

$(document).ready(function () {
    initDB();
    init();
    checkIfAlreadyLoggedOn();
    ///DB.dropTables();
    //localStorage.clear();
});
