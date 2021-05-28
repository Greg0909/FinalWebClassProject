//const ProductService = require('../../services/viewsServices');
const UserServices = require('../../services/userServices');
const ProductServices = require('../../services/productServices');


module.exports = {

    renderProductEditor: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
            res.end();
            return;
        }
    
        console.log("Entering GET of id:", req.query.id);
    
        let porductSearchInstance = await ProductServices.getProduct(req.query.id);
        res.render("productEditor", porductSearchInstance);
    },
    
    renderProductDashboard: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
            res.end();
            return;
        }
            
        res.sendFile("productDashboard.html", {'root': __dirname + "../../../client-resources/"});
            
    },

    renderProductCreator: async function(req, res){
        if(!await UserServices.isAdmin(req)){
            res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
            res.end();
            return;
        }
            
        res.sendFile("index.html", {'root': __dirname + "../../../client-resources/"});
        
    },

    renderProductCart: function(req, res){
        res.render("cart", {});
    },

    renderLogin: function(req, res){
        res.sendFile("login.html", {'root': __dirname + "../../../client-resources/"});
    },

    renderSignup:function(req, res){
        res.sendFile("signup.html", {'root': __dirname + "../../../client-resources/"});
    },

}