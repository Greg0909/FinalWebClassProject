document.getElementById("user-login-form").onsubmit = (e) => {
    e.preventDefault();

    const userEmail = e.target.querySelector("#email").value;
    const userPassword = e.target.querySelector("#password").value;



    if(!userEmail){ 
        showAlert("Empty email", "please enter an email in the email field.", "error");
        return
    };
    if(!userPassword){ 
        showAlert("Empty password", "please enter the password in the password field.", "error");
        return
    };


                                                            // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    }

    sendUserLoginInfo({
        email: userEmail,
        password: userPassword,
    }).then((status)=>{
        console.log("STatus ", status);
        if(status == 200)
            window.open("http://localhost:3000/productdashboard", "_self");
        else
            showAlert("Invalid account","La cuenta no existe o el mail y contraseña no corresponden","error");
    });
   
}
