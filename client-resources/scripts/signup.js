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


                                                            // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    }

    sendUserSignUpInfo({
        email: userEmail,
        password: userPassword,
    }).then(()=>{
        //window.open("http://localhost:3000/productdashboard", "_self");
    });
   
}