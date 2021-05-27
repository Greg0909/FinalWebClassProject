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
        showAlert("emptyName");
        return
    };
    if(!productPrice){ 
        showAlert("emptyPrice");
        return
    };

                                                            // Checks for valid Price input (should be an integer or 
                                                            // decimal number)
    const trimmedProductPrice = productPrice.trim();
    if( !( /^\d+(\.\d+|)$/.test( trimmedProductPrice ) ) ) {
        showAlert("invalidPrice");
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
        showAlert("success");
                                                            // Erase the values from the input fields after the product
                                                            // card was succesfully added.
        e.target.querySelector("#productNameField").value = "";
        e.target.querySelector("#productPriceField").value = "";
        e.target.querySelector("#productBrandField").value = "";
        e.target.querySelector("#productWeightField").value = "";
    });

}

