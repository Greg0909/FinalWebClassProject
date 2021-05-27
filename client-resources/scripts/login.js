document.getElementById("user-login-form").onsubmit = (e) => {
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
            console.log("Error en el e-mail o en la contraseña");
    });
   
}