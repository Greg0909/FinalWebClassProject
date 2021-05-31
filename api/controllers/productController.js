const ProductServices = require('../../services/productServices');
const UserServices = require('../../services/userServices');

module.exports = {
    createProduct: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.status(403).send(`You are not admin`);
            return;
        }
    
        let createdProduct = await ProductServices.createProduct(req.body);
        
        if(createdProduct)
            res.send(createdProduct);
        else
            res.status(503).send(`error: the product could not be created`);
    },
    
    getProduct: async function(req, res){
        console.log("Entering GET of id:", req.params.id);
    
        let productSearchInstance = await ProductServices.getProduct(req.params.id);
        res.send( productSearchInstance);
    },
    
    getAllProducts: async function(req, res){
        let allProducts = await ProductServices.getAllProducts();
        res.send(allProducts);
    },

    deleteProduct: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.status(403).send(`You are not admin`);
            return;
        }
    
        console.log("Entering DELETE to delete id:", req.params.id);
    
        await ProductServices.deleteProduct(req.params.id);
        res.send("OK");
    },

    updateProduct: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.status(403).send(`You are not admin`);
            return;
        }
    
        console.log("Editing instance with id:", req.params.id);

        if(ProductServices.updateProduct(req.params.id, req.body))
            res.send("OK");
        else
            res.status(503).send(`error: no se encontro el producto`);

    },
};