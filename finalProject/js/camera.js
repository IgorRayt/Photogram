/**
 * Created by Irayt1063
 *              on 4/18/2016.
 */
function capturePhoto(){
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA
    };
    function onSuccess(imageURI){
        //image address
        var image = $("#newPhoto");
        image.attr("src", imageURI);
        window.location.href="#addPhoto";
    }
    function onFail(){
        alert("Failed because: " + message);
    }
    navigator.camera.getPicture(onSuccess, onFail, options);
}

function capturePhotoForUser(){
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA
    };
    function onSuccess(imageURI){
        //image address
        id = localStorage.getItem("UserId");
        var options =[imageURI, id];
        User.updatePhoto(options);
        window.location.href="#myPhotosPage";
    }
    function onFail(){
        alert("Failed because: " + message);
    }
    navigator.camera.getPicture(onSuccess, onFail, options);
}