let productNamesHistory = [];
let productPriceShown = {};
let totalPrice = 0;
// let totalPriceDisplaySpan = document.getElementById("totalPriceDisplay");

function getTextDecsriptionFromAttributes(attributesValues={}){
    let description = "";
    
    if(attributesValues["price"]){
        description += `Price: ${attributesValues["price"]} <br/>`;
    }

    if(attributesValues["brand"] && attributesValues["brand"]!=""){
        description += `Brand: ${attributesValues["brand"]} <br/>`;
    }

    if(attributesValues["weight"] && attributesValues["weight"]!=""){
        description += `Weight: ${attributesValues["weight"]} <br/>`;
    }

    return description;
}



function onDelete(e){
    const parentCard = e.target.parentNode.parentNode;
    const productNameInCard = e.target.parentNode.querySelector("h5").textContent;
    const productId = e.target.name;
    
    deleteProduct(productId).then(()=>{
        parentCard.parentNode.removeChild( parentCard );
    
                                                            // Updates and displays the total price.
        // totalPrice -= productPriceShown[ productId ];
        // totalPriceDisplaySpan.innerText = (Math.round(totalPrice * 100) / 100).toFixed(2);;

        productNamesHistory = productNamesHistory.filter( (productName) => (productName != productNameInCard.toLowerCase()) );
        delete productPriceShown[ productId ];
    });
}


function onEdit(e){
    const productId = e.target.name;
    window.open("http://localhost:3000/productEditor?id="+productId, "_self");
}

                                                            // *** Its not implemented yet ***
function isRepeated(productName){
    // We dont know if there can be more than 1 product with the same name but different barnd.
}

const addCard = (attributesValues={}) => {

                                                            // Creates the card div
    let divCard = document.createElement("div");
    divCard.classList.toggle("card");
    divCard.style = "width: 18rem; display:inline-block;";

                                                            // Adds the card to the productCardContainer
    document.getElementById("productCardContainer").prepend(divCard);

    // Creates the image element for the card and adds it
    // let imgCard = document.createElement("img");
    // imgCard.classList.toggle("card-img-top");
    // imgCard.src = attributesValues.imageUrl;
    // divCard.append(imgCard);

                                                            // Creates the card body div and adds it to the card
    let divCardBody = document.createElement("div");
    divCardBody.classList.toggle("card-body");
    divCard.append(divCardBody);

                                                            // Creates the card title and adds it to the card body
    let headerCard = document.createElement("h5");
    headerCard.classList.toggle("card-title");
    headerCard.textContent = attributesValues["name"].toUpperCase();
    divCardBody.append(headerCard);

                                                            // Creates the card text and adds it to the card body
    let pCard = document.createElement("p");
    pCard.classList.toggle("card-text");
    pCard.innerHTML = getTextDecsriptionFromAttributes(attributesValues);
    divCardBody.append(pCard);

                                                            // Creates the delete button and adds it to the card body
    let deleteButton = document.createElement("button");
    deleteButton.name = attributesValues["_id"];
    deleteButton.classList.toggle("btn");
    deleteButton.classList.toggle("btn-danger");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = onDelete;
    divCardBody.append(deleteButton);


                                                            // Creates the edit button and adds it to the card body
    let editButton = document.createElement("button");
    editButton.name = attributesValues["_id"];
    editButton.classList.toggle("btn");
    editButton.classList.toggle("btn-info");
    editButton.textContent = "Edit";
    editButton.onclick = onEdit;
    divCardBody.append(editButton);
    
                                                            // Saves the product name in the history to prevent duplicate names.
    productNamesHistory.push(attributesValues["name"].toLowerCase());

                                                            // Saves the price of the product paired to the product id, so we can
                                                            // substract the product price from the total price when the product is
                                                            // deleted.
    productPriceShown[ attributesValues["_id"] ] = attributesValues["price"];

                                                            // Updates the variable and displays the new totalPrice
    // totalPrice += attributesValues["price"];
    // totalPriceDisplaySpan.innerText = (Math.round(totalPrice * 100) / 100).toFixed(2);

    productCollection.push(attributesValues);
}








function showAlert(alertType="404"){
    switch(alertType){
        case "404":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Error 404</strong> you should check the spelling of the product Name.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            break;
        case "emptyName":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Empty Name</strong> Please enter a name in the input field.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            break;
        case "emptyPrice":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Empty Price</strong> Please enter a price in the input field.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            break;
        case "invalidPrice":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Invalid Price</strong> Please enter a valid price in the input field. It should be an integer or decimal number.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            break;
        case "repeated":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Repeated Product</strong> The product is already on the dashboard.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            break;
        case "success":
            document.getElementById("alertDiv").innerHTML = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\"><strong>Success</strong> The product was added.<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button></div>";
            setTimeout(() => {
                document.querySelector(".alert button").click();
            }, 1500); 
            break;
    }
}