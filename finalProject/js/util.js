/**
 * Created by Irayt1063
 *              on 4/14/2016.
 */

function changeUserPhoto(){
    if(cameraready){
        capturePhotoForUser();
        window.location.href="#addPhoto";
    }
    else{
        alert("Camera is not ready");
    }
}

function takePhoto(){
    /*if(cameraready){
        capturePhoto();
        window.location.href="#addPhoto";
    }
    else{
        alert("Camera is not ready");
    }*/
    window.location.href="#addPhoto";
}

function checkIfAlreadyLoggedOn(){
    if(localStorage.getItem("UserId") != "null" && localStorage.getItem("UserId") != null){
        console.info("checking logging");
        window.location.href="#photosPage";
    }
}

function showAllPhotosFeed(){
    Photo.selectAll(showFeed);
}

function loadComments(){
    var id = localStorage.getItem("photoId");
    var options = [id];
    console.info(options);
    Comment.select(options, successCommentSelect);
}

function logout(){
    localStorage.setItem("UserId", null);
    window.location.href = "#loginPage";
}

function loadUsers(){
    User.selectAll(showAllUsers);
}

function showMyPage(){
    var id = localStorage.getItem("UserId");
    var options = [id];
    console.info(options);
    User.selectId(options, successSelfShow);
    Photo.selectFromUser(options, successSelfPhotoShow);
}

function showOtherUserPage(){
    var id = localStorage.getItem("otherUserId");
    var options = [id];
    User.selectId(options, successOtherUserShow);
    Photo.selectFromUser(options, successOtherPhotoUserShow);
}

function searchUsers(){
    var searchText = $("#txtSearch").val();
    var options = [searchText];
    console.info(options);
    User.search(options, successUserSearch);
}

function showSettings(){
    var id = localStorage.getItem("UserId");
    var options = [id];
    User.selectId(options, successSettingsShow);
}

function changeUserSettings(){
    var username = $("#txtNewUsername").val();
    var options = [];
    var usernameUsed = false;

    function checkUsername(tx, results){
        console.info("user");
        console.info(results.rows.length);
        var id = localStorage.getItem("UserId");
        var row;
        if(results.rows.length > 0){
            row = results.rows[0];
        }
        console.info(results.rows.length);
        if(results.rows.length == 0 || (results.rows.length == 1 && row['id'] == id)){
            usernameUsed = false;
            var email = $("#txtNewEmail").val();
            options = [email];
            console.info(email);
            console.info(options);
            console.info("selecting email" + options);
            User.selectEmail(options, checkEmail)
        }
        else{
            alert("Same username used")
            usernameUsed = true;
        }
    }
    function checkEmail(tx, results){
        console.info("email");
        var idCheck = localStorage.getItem("UserId")
        var row;
        if(results.rows.length > 0){
            row = results.rows[0];
        }
        if(usernameUsed == false){
            if(results.rows.length == 0 || (results.rows.length == 1 && row['id'] == idCheck)){
                if(changeUserSettingsValidation()){
                    var username = $("#txtNewUsername").val();
                    var fName = $("#txtNewUserFirstName").val();
                    var lName = $("#txtNewUserLastName").val();
                    var email = $("#txtNewEmail").val();
                    var photo="";
                    var id= localStorage.getItem("UserId");

                    var options = [username, fName, lName, email, photo, id];

                    User.update(options);
                    showSettings();
                }
            }
            else{
                alert("Same email used");
            }
        }

    }


    options = [username];
    console.info(options);
    User.select(options, checkUsername);
}


function changePassword(){
    if(changePasswordValidation()){
        var id = localStorage.getItem("UserId");
        var options = [id];
        function successUserSelect(tx, results){
            var row = results.rows[0];
            var oldPassword = $("#txtOldPassword").val();
            if(row['password'] == oldPassword){
                var newP = $("#txtNewPassword").val();
                var confP = $("#txtConfirmNewPassword").val();
                console.info(newP, " ", confP);
                if(newP == confP){
                    options = [newP, id];
                    User.changePassword(options);
                    alert("password has been changed")
                    $("#txtNewPassword").val("")
                    $("#txtConfirmNewPassword").val("");
                    $("#txtOldPassword").val("");
                }
                else{
                    alert("Password dont match");
                }
            }
            else{
                alert("Incorrect Old Password")
            }

        }
        console.info(options);
        User.selectId(options, successUserSelect);
    }

}

function changePasswordValidation(){
    var form = $("#frmChangePassword")
    form.validate({
        rules:{
            txtNewPassword:{
                required: true,
                minlength: 4
            },
            txtConfirmNewPassword:{
                required: true,
                minlength: 4
            }
        },
        messages:{
            txtNewPassword:{
                required: "Password is required",
                minlength: "Password min length is 4 characters"
            },
            txtConfirmNewPassword:{
                required: "Password is required",
                minlength: "Password min length is 4 characters"
            }
        }
    });
    return form.valid();
}

function changeUserSettingsValidation(){
    var form = $("#frnChangeUserSettings")
    form.validate({
       rules:{
           txtNewUserFirstName:{
               required: true,
               minlength: 2,
               NameCheck: true
           },
           txtNewUserLastName:{
               required: true,
               minlength: 2,
               NameCheck: true
           },
           txtNewUsername:{
               required: true,
               minlength: 2,
               maxlength: 30,
               NameCheck: true
           },
           txtNewEmail:{
               required: true,
               email:true
           }
       },
        messages:{
            txtNewUserFirstName:{
                required: "First Name is required",
                minlength: "Length must be at least 2 characters"
            },
            txtNewUserLastName:{
                required: "Last Name is required",
                minlength: "Length must be at least 2 characters"
            },
            txtNewUsername:{
                required: "Username is required",
                minlength: "Length must be 2 - 30 characters long",
                maxlength: "Length must be 2 - 30 characters long"
            },
            txtNewEmail:{
                required: "Email is required",
                email: "Please enter valid email"
            }
        }
    });
    return form.valid();
}
function newUserValidation(){
    var form = $("#frmCreateUser");
    form.validate({
        rules:{
            txtCreateUsername:{
                required: true,
                minlength: 2,
                maxlength: 30
            },
            txtCreateFirstName:{
                required: true,
                minlength: 2,
                NameCheck: true
            },
            txtCreateLastName:{
                required: true,
                minlength: 2,
                NameCheck: true
            },
            txtCreateEmail:{
                required: true,
                email:true
            },
            txtCreatePassword1:{
                required: true,
                minlength: 4
            },
            txtCreatePassword2:{
                required: true,
                minlength: 4
            }
        },
        messages:{
            txtCreateUsername:{
                required: "Username is required",
                minlength: "Length must be 2 - 30 characters long",
                maxlength: "Length must be 2 - 30 characters long"
            },
            txtCreateFirstName:{
                required: "First Name is required",
                minlength: "Length must be at least 2 characters"
            },
            txtCreateLastName:{
                required: "Last Name is required",
                minlength: "Length must be at least 2 characters"
            },
            txtCreateEmail:{
                required: "Email is required",
                email:"Please enter valid email"
            },
            txtCreatePassword1:{
                required: "Password is required",
                minlength: "Password must contain at least 4 characters"
            },
            txtCreatePassword2:{
                required: "Password is required",
                minlength: "Password must contain at least 4 characters"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("NameCheck", function(value, element) {
    return this.optional( element ) || /^[a-zA-Z ]+$/.test( value );
}, 'Please enter with only alphabets');

function createUser(){
	if(newUserValidation()){
		var username = $("#txtCreateUsername").val();
		var options = [];
		var usernameUsed = false;

		function checkUsername(tx, results){
			console.info("user");
			if(results.rows.length == 0){
				usernameUsed = false;
				var email = $("#txtCreateEmail").val();
				options = [email];
				console.info(email);
				console.info(options);
				console.info("selecting email" + options);
				User.selectEmail(options, checkEmail)
			}
			else{
				alert("Same username used")
				usernameUsed = true;
			}
		}
		function checkEmail(tx, results){
			console.info("email");
			if(usernameUsed == false){
				if(results.rows.length == 0){
					if (newUserValidation) {
						var password = $("#txtCreatePassword1").val();
						var password2 = $("#txtCreatePassword2").val();
						if(password == password2){
							var username = $("#txtCreateUsername").val();
							var fName = $("#txtCreateFirstName").val();
							var lName = $("#txtCreateLastName").val();
							var email = $("#txtCreateEmail").val();
							var photo = "images/questionMark.png";

							var options = [username, password, fName, lName, email, photo];
							console.info(options);
							console.info("Attempting insert parameters for new user");

							User.insert(options);

							alert("New user added");

							window.location.href = "#loginPage";

							$("#txtCreateUsername").val("");
							$("#txtCreateFirstName").val("");
							$("#txtCreateLastName").val("");
							$("#txtCreateEmail").val("");
							$("#txtCreatePassword1").val("");
							$("#txtCreatePassword2").val("");


						}
						else{
							alert("passwords don't match");
						}

					}
				}
				else{
					alert("Same email used");
				}
			}

		}


		options = [username];
		User.select(options, checkUsername);
	}
    
}



