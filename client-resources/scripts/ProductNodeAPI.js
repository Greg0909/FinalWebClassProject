                                                            // POST - to send the product info to the server. It will CREATE 
                                                            // a new instance in the DB.
function sendProductInfo(attributes) {
    return axios.post('http://localhost:3000/products/create', {
        ...attributes
      })
      .then((response) => {
        console.log(response);
        return response.data;
      }, (error) => {
        console.log(error);
      });
}


                                                            // GET ALL - READs all the products instances from the DB.
function getAllProducts(){
    return axios.get('http://localhost:3000/products')
      .then((response) => {
        console.log(response.data);
        return response.data;
      }, (error) => {
        console.log(error);
      });
}


                                                            // PUT - UPDATEs a specific product information.
function updateProduct(attributes){
    console.log("Actualizando:", attributes);
    return axios.put('http://localhost:3000/products/' + attributes._id,{
        ...attributes
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}


                                                            // DELETE - Deletes a specific product using its id.
function deleteProduct(id){
    console.log("Tratando de enviar el delete");
    return axios.delete('http://localhost:3000/products/'+id,{
        id:id
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}


                                                            // POST - to send the user sign up info to the server to create
                                                            // a new user interface
function sendUserSignUpInfo(attributes){
  return axios.post('http://localhost:3000/users/create', {
        ...attributes
      })
      .then((response) => {
        return response.status;
      }, (error) => {
        return 404;
      });
}

                                                            // POST - to send the user login info to the server to check
                                                            // if the user exists.
function sendUserLoginInfo(attributes){
  return axios.post('http://localhost:3000/login', {
        ...attributes
      })
      .then((response) => {
        console.log(response);
        return response.status;
      }, (error) => {
        console.log(error);
        return 404;
      });
}

                                                            // GET - to logout the user by changing the exipration date of
                                                            // the cookie.
function logout(){
  return axios.get('http://localhost:3000/logout')
  .then((response) => {
    console.log(response.data);
    return response.data;
  }, (error) => {
    console.log(error);
  });
}

                                                            // POST - sends the products added to the cart to the server.
function completePurchase(cartProducts){
  return axios.post('http://localhost:3000/completePurchase', 
      cartProducts
    )
    .then((response) => {
      console.log(response);
      return response.status;
    }, (error) => {
      console.log(error);
      return 404;
    });
}


                                                            // PUT - UPDATEs a specific user information.
function updateUser(attributes){
    console.log("Actualizando:", attributes);
    return axios.put('http://localhost:3000/users/' + attributes._id,{
        ...attributes
    })
      .then((response) => {
        return response.status;
      }, (error) => {
        return response.status;
      });
}

                                                            // DELETE - Deletes a specific user using its id.
function deleteUser(id){
    return axios.delete('http://localhost:3000/users/'+id,{
        id:id
    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
}