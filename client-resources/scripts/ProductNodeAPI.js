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


                                                            // DELETE - DELEtes a specific product using its id.
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
        console.log(response);
        return response.data;
      }, (error) => {
        console.log(error);
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