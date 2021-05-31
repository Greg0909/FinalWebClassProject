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
    // if(!userPassword){ 
    //     showAlert("Empty password", "please enter the password in the password field.", "error");
    //     return
    // };


    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    let profilePicture = "";

                                                                // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get('id');


    if (file) {
        reader.readAsDataURL(file);
        reader.addEventListener("load", function () {
            // convert image file to base64 string
            try{ profilePicture = reader.result;}
            catch{ profilePicture = "";}
            
            updateUser({
                name: userName,
                email: userEmail,
                password: userPassword,
                profilePicture: profilePicture,
                _id: queryId,
            }).then((responseStatus)=>{
                if(responseStatus!=200){
                    showAlert("Error editing the account", "", "error");
                    return;
                }
                //showAlert("Success on Signup", "please go to the login page to login with the new accoutn", "success");
    
                window.open("http://localhost:3000/cart", "_self");
            });
    
        }, false);
    }else{
        profilePicture = "";
        
        updateUser({
            name: userName,
            email: userEmail,
            password: userPassword,
            profilePicture: profilePicture,
            _id: queryId,
        }).then((responseStatus)=>{
            if(responseStatus!=200){
                showAlert("Error editing the account", "", "error");
                return;
            }
            //showAlert("Success on Signup", "please go to the login page to login with the new accoutn", "success");

            window.open("http://localhost:3000/cart", "_self");
        });
    }
    // else{
    //     showAlert("Empty profile picture", "please select a profile picture.", "error");
    //     return;
    // }
   
}
