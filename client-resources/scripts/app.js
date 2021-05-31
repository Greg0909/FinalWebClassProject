                                                            // Saves the products instances returned from the server
                                                            // to matain a record of the ids, which are used to make the
                                                            // deletion, update and total price calculation.
let productCollection = [];

document.getElementById("product-info-form").onsubmit = (e) => {
    e.preventDefault();

    const productName = e.target.querySelector("#productNameField").value;
    const productPrice = e.target.querySelector("#productPriceField").value;
    const productBrand = e.target.querySelector("#productBrandField").value;
    const productWeight = e.target.querySelector("#productWeightField").value;

    if(!productName){ 
        showAlert("Empty Name", "Please enter a name in the input field.", "error");
        return
    };
    if(!productPrice){ 
        showAlert("Empty Price", "Please enter a price in the input field.", "error");
        return
    };

                                                            // Checks for valid Price input (should be an integer or 
                                                            // decimal number)
    const trimmedProductPrice = productPrice.trim();
    if( !( /^\d+(\.\d+|)$/.test( trimmedProductPrice ) ) ) {
        showAlert("Invalid Price", "Please enter a valid price in the input field. It should be an integer or decimal number.", "error");
        return;
    }

                                                            // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    }
    
    

    sendProductInfo({
        name: productName,
        price: parseFloat(trimmedProductPrice),
        brand: productBrand,
        weight: productWeight
    }).then((data)=>{
        //addCard(data);
        showAlert("Success", "The product was added successfully.", "success");
                                                            // Erase the values from the input fields after the product
                                                            // card was succesfully added.
        e.target.querySelector("#productNameField").value = "";
        e.target.querySelector("#productPriceField").value = "";
        e.target.querySelector("#productBrandField").value = "";
        e.target.querySelector("#productWeightField").value = "";
    });

}

document.getElementById("logoutButton").onclick = ()=>{
    logout();
    window.open("http://localhost:3000/login", "_self");
}