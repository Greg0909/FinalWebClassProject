document.getElementById("user-signup-form").onsubmit = (e) => {
    e.preventDefault();

    const userEmail = e.target.querySelector("#email").value;
    const userPassword = e.target.querySelector("#password").value;


    if(!userEmail){ 
        showAlert("emptyName");
        return
    };
    if(!userPassword){ 
        showAlert("emptyPrice");
        return
    };


    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    let profilePicture = "";

    if (file) {
        reader.readAsDataURL(file);
    }
    else{
        console.log("No profile picture detected");
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
            email: userEmail,
            password: userPassword,
            profilePicture: profilePicture,
        }).then(()=>{
            //window.open("http://localhost:3000/productdashboard", "_self");
        });

    }, false);

    
   
}
