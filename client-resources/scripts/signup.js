document.getElementById("user-signup-form").onsubmit = (e) => {
    e.preventDefault();

    const userName = e.target.querySelector("#name").value;
    const userEmail = e.target.querySelector("#email").value;
    const userPassword = e.target.querySelector("#password").value;


    if(!userName){ 
        showAlert("Empty name", "please enter a name in the name field.", "error");
        return
    };
    if(!userEmail){ 
        showAlert("Empty email", "please enter an email in the email field.", "error");
        return
    };
    if(!userPassword){ 
        showAlert("Empty password", "please enter the password in the password field.", "error");
        return
    };


    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    let profilePicture = "";

    if (file) {
        reader.readAsDataURL(file);
    }
    else{
        showAlert("Empty profile picture", "please select a profile picture.", "error");
        return;
    }


                                                            // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    }

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        profilePicture = reader.result;
        
        sendUserSignUpInfo({
            name: userName,
            email: userEmail,
            password: userPassword,
            profilePicture: profilePicture,
        }).then((responseStatus)=>{
            if(responseStatus!=200){
                showAlert("Error creating the account", "maybe the email is already registered", "error");
                return;
            }
            showAlert("Success on Signup", "please go to the login page to login with the new accoutn", "success");

            e.target.querySelector("#name").value = "";
            e.target.querySelector("#email").value = "";
            e.target.querySelector("#password").value = "";
            //window.open("http://localhost:3000/productdashboard", "_self");
        });

    }, false);

}
