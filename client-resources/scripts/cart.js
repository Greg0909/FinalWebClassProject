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
        console.log("Error, porfavor selecciona un producto");
        return;
    }
    if(!quantityInputField.value.match(/^[0-9]+$/g)){
        console.log("Error, porfavor introdusca un numero entero valido (no decimales)");
        return;
    }

    const product = allProducts[ productIndex ];
    const quantity = parseInt(quantityInputField.value);
    console.log("El producto seleccionado fue", product.name);

    const newRow = `<tr> <th scope=\"row\">${product.name}</th> <td>${product.price}</td> <td>${quantity}</td> <td>${quantity*product.price}</td> </tr>`;
    productTable.innerHTML += newRow;

    cartProducts.push({...product, quantity:quantity});
    
    totalPriceCart += product.price * quantity;
    totalPriceDisplay.innerText = totalPriceCart;
};

document.getElementById("logoutButton").onclick = ()=>{
    logout();
    window.open("http://localhost:3000/login", "_self");
}