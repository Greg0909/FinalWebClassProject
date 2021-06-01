let allProducts = {};
let cartProducts = [];
let totalPriceCart = 0;

let dropDownProductSelector = document.getElementById("dropdownProduct");
let productTable = document.getElementById("cartProductTable");
let quantityInputField = document.getElementById("quantity");
let totalPriceDisplay = document.getElementById("totalPriceDisplay");

getAllProducts().then((data)=>{
    allProducts = data;

    let index = 0;
    data.forEach((product)=>{
        const newOption = `<option value=\"${index}\">${product.name}</option>`;
        dropDownProductSelector.innerHTML+=newOption;
        index++;
    });
});

document.getElementById("addProduct").onclick = ()=>{
    const productIndex = parseInt( dropDownProductSelector.value);

    if(productIndex==-1){
        showAlert("Empty Product Selection", "porfavor selecciona un producto.", "error");
        return;
    }
    if(!quantityInputField.value.match(/^[0-9]+$/g)){
        showAlert("Invalid quantity", "porfavor introdusca un numero entero valido (no decimales).", "error");
        return;
    }

                                                            // Dispose previous alerts
    var alertNode = document.querySelector('.alert');
    if(alertNode){
        document.querySelector(".alert button").click();
    } 

    const product = allProducts[ productIndex ];
    const quantity = parseInt(quantityInputField.value);
    console.log("El producto seleccionado fue", product.name);

    const newRow = `<tr> <th scope=\"row\">${product.name}</th> <td>${product.price}</td> <td>${quantity}</td> <td>${quantity*product.price}</td> </tr>`;
    productTable.innerHTML += newRow;

    cartProducts.push({_id:product._id, price:product.price , quantity:quantity});
    
    totalPriceCart += product.price * quantity;
    totalPriceDisplay.innerText = totalPriceCart;

    showAlert("Success", "The product was added succesfuly to the cart.", "success");
};

document.getElementById("logoutButton").onclick = ()=>{
    logout();
    window.open("http://localhost:3000/login", "_self");
}

                                                            // Sends the cart to the server and empties the
                                                            // cart/table.
document.getElementById("completePurchase").onclick = ()=>{
    if(cartProducts.length==0){
        showAlert("Empty cart", "please add at least 1 product to your cart before completeing the purchase.", "error");
        return;
    }

    completePurchase(cartProducts).then((responseStatus)=>{
        if(responseStatus==404){
            showAlert("Error on purchase", "The cart could not be purchased.", "error");
        }
        productTable.innerHTML = "";
        cartProducts = [];
        totalPriceCart = 0;
        totalPriceDisplay.innerText = totalPriceCart;
        showAlert("Success", "The cart was succesfully purchased.", "success");
    });
}

document.getElementById("editUser").onclick = (e)=>{
    const id = e.target.name;
    window.open(`http://localhost:3000/usereditor?id=${id}`, "_self");
};

document.getElementById("deleteUser").onclick = (e)=>{
    const id = e.target.name;
    deleteUser(id).then(()=>{
        window.open(`http://localhost:3000/login`, "_self");
    });
};