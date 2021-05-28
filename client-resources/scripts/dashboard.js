                                                            // Saves the products instances returned from the server
                                                            // to matain a record of the ids, which are used to make the
                                                            // deletion, update and total price calculation.
let productCollection = [];
                                                            // Gets all the products from the server and adds then to the 
                                                            // dashboard.
getAllProducts().then((dataCollection)=>{
    dataCollection.forEach(element => {
        addCard(element);
        productCollection.push(element);
    });
});

document.getElementById("logoutButton").onclick = ()=>{
    logout();
    window.open("http://localhost:3000/login", "_self");
}