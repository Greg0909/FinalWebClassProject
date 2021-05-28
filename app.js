
                                                            // Imports modules to create the server and get the
                                                            // product attributes from the DB.
var express = require('express');
var app = express();
app.use(express.static(__dirname + "/client-resources"));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

let jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const crypto = require('crypto');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/client-resources');



const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const { mongoUrl } = require('./config');
console.log("Connecting to " + mongoUrl);

const UserServices = require('./services/userServices');



                                                            // Is the middleware that checks of the user
                                                            // is logged through the cookie. If its not logged
                                                            // the server redirects to the login page. This does
                                                            // not apply to the sign up page.
app.use((req, res, next)=>{
    console.log("USING A MIDDLEWARE", req.url);

    if(req.url==="/login" || req.url==="/signup")
    {
        next();
        return;
    }

    if(req.url.indexOf("/products") > -1 || req.url.indexOf("/productEditor") > -1 || req.url.indexOf("/productdashboard") > -1  ||
        (req.url.indexOf("/user") > -1 && req.url.indexOf("/user/create") == -1) || req.url.indexOf("/productcreation") > -1 || req.url.indexOf("/cart") > -1)
    {
        let accessToken = req.cookies.jwt;

        if(!accessToken){
            console.log("No cookie found");
            res.writeHead(302, {Location: 'http://localhost:3000/login'} );
            res.end();
            return;
        }
    
        let payload
        try{
            payload = jwt.verify(accessToken, "webclass");
            req.userId = payload.id;
            console.log("payload", payload);
            next();
            return;
        }
        catch(e){
            console.log("Error on getting payload");
            res.writeHead(302, {Location: 'http://localhost:3000/login'} );
            res.end();
            return;
        }
    }
    

    next();
});


                                                            // Defining the schema
// console.log("Defining the schema")
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     brand: {type:String, required:false},
//     weight: {type:Number, required:false},
// });

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     admin: Boolean
// });

                                                            // Before saving the user instance, the password is 
                                                            // hashed to prevent storing it in plain text.
// userSchema.pre('save', function(){
//     const hash = crypto.getHashes();  
//                                                             // 'digest' is the output of hash function containing 
//                                                             // only hexadecimal digits
//     hashPassword = crypto.createHash('sha1').update(this.password).digest('hex');
//     this.password = hashPassword;
// });

                                                            // Connecting with the database
//const mongoDB = 'mongodb://localhost:27017/ProductDB';

mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true });

                                                            // Getting the default connection
var db = mongoose.connection;

                                                            // Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to database server');
    initializeModel();
});

                                                            // Create a model from a schema
function initializeModel(){
    console.log("Initializing the model")
    // ProductModel = mongoose.model('ProductDB', productSchema);
    // UserModel = mongoose.model('UserDB', userSchema);
    
                                                            // Erase previous product instances from the DB to start with a
                                                            // clean DB.
    // ProductModel.deleteMany({ }, function (err) {
    //     if (err) console.log(err);
    //   });

                                                            // Erase previous user instances from the DB to start with a
                                                            // clean DB.
    // UserModel.deleteMany({ }, function (err) {
    //     if (err) console.log(err);
    //   });
    UserServices.deleteAllUsers();
    UserServices.addAdminUser();


    //                                                         // Creates the admin account
    // let productInstanceData = new UserModel({email: 'admin@itesm.mx', password: "pass",admin: true});
    // productInstanceData.save((err) => {
    //     if (err) console.log(`error: ${err}`); 
    //     else {
    //         console.log("Se creo la cuenta de administrador con email 'admin@itesm.mx' y contraseña 'pass'");
    //     }
    // });
}















                                                            // Creates a new product instance in the DB 
// app.route('/products/create').post(async function(req, res){
//     if(!await isAdmin(req)){
//         res.status(403).send(`You are not admin`);
//         return;
//     }

//     console.log("Creating a product with attributes:", req.body);

//     let porductSearchInstance = await ProductModel.findOne(req.body);

//     if(!porductSearchInstance){
//         let productInstanceData = new ProductModel(req.body);
//         productInstanceData.save((err) => {
//             if (err) res.status(503).send(`error: ${err}`); 
//             else {
//                 res.send(productInstanceData);
//             }
//         });
//     }

// });

                                                            // Returns a Json with all the products and their attributes
// app.route('/products').get(async function(req, res){
//     let allProducts = await ProductModel.find({});
//     res.send(allProducts);
// });

                                                            // Deletes the product containing the passed id from the query
// app.route('/products/:id').delete(async function(req, res){
//     if(!await isAdmin(req)){
//         res.status(403).send(`You are not admin`);
//         return;
//     }

//     console.log("Entering DELETE to delete id:", req.params.id);

//     await ProductModel.deleteOne({_id: req.params.id});
//     res.send("OK");
// });

                                                            // Returns/Sends the specific product info from the id send by
                                                            // the client.
// app.route('/products/:id').get(async function(req, res){
//     console.log("Entering GET of id:", req.params.id);

//     let porductSearchInstance = await ProductModel.findOne({_id: req.params.id});
//     res.send( porductSearchInstance);
// });

                                                            // Returns/Sends the edit view html template filled with the product 
                                                            // attributes from the product with the same id from the query.
// app.route('/productEditor').get(async function(req, res){
//     if(!await isAdmin(req)){
//         res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
//         res.end();
//         return;
//     }

//     console.log("Entering GET of id:", req.query.id);

//     let porductSearchInstance = await ProductModel.findOne({_id: req.query.id});
//     res.render("productEditor", porductSearchInstance);
// });

                                                            // Updates the passed product attributes from the product with
                                                            // the same unique id from the body.
// app.route('/products/:id').put(async function(req, res){
//     if(!await isAdmin(req)){
//         res.status(403).send(`You are not admin`);
//         return;
//     }

//     console.log("Editing instance with id:", req.params.id);
//     let porductSearchInstance = await ProductModel.findOne({_id: req.params.id});

//     if(porductSearchInstance){
//         await ProductModel.updateOne({_id: req.params.id}, req.body);
//         res.send("OK");
//     }
// });

                                                            // Returns the product dashboard to view and 
                                                            // delete them.
// app.route('/productdashboard').get(async function(req, res){
//     if(!await isAdmin(req)){
//         res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
//         res.end();
//         return;
//     }
        
//     res.sendFile("productDashboard.html", {'root': __dirname + "/client-resources/"});
        
// });

                                                            // Returns the product creation page to add new products
// app.route('/productcreation').get(async function(req, res){
//     if(!await isAdmin(req)){
//         res.writeHead(302, {Location: 'http://localhost:3000/cart'} );
//         res.end();
//         return;
//     }
        
//     res.sendFile("index.html", {'root': __dirname + "/client-resources/"});
    
// });

// app.route('/cart').get( function(req, res){
//     res.render("cart", {});
// });
















// app.route('/login').get( function(req, res){
//     res.sendFile("login.html", {'root': __dirname + "/client-resources/"});
// });

// app.route('/signup').get( function(req, res){
//     res.sendFile("signup.html", {'root': __dirname + "/client-resources/"});
// });

                                                            // Creates a new user instance in the DB 
// app.route('/user/create').post(async function(req, res){
//     console.log("Creating a new user with attributes:", req.body);

//     let porductSearchInstance = await UserModel.findOne(req.body);

//     if(!porductSearchInstance){
//         req.body.admin = false;
//         let productInstanceData = new UserModel(req.body);
//         productInstanceData.save((err) => {
//             if (err) res.status(503).send(`error: ${err}`); 
//             else {
//                 res.send(productInstanceData);
//             }
//         });
//     }

// });

                                                            // Checks if the user instance exists and if it
                                                            // exists then it sends a response with a cookie
                                                            // with the user id.
// app.route('/login').post(async function(req, res){
//     console.log("Logging the user with attributes:", req.body);
//     const hash = crypto.getHashes();  

//     hashPassword = crypto.createHash('sha1').update(req.body.password).digest('hex');
//     req.body.password = hashPassword;


//     let porductSearchInstance = await UserModel.findOne(req.body);

//     if(porductSearchInstance){
//         let payload = {id: porductSearchInstance._id};

//         let accessToken = jwt.sign(payload, "webclass", {
//             algorithm: "HS256",
//             expiresIn: 300
//         })

//         console.log("El usuario si existe");
//         res.cookie("jwt", accessToken, /*{secure:true, httpOnly:true}*/);
//         res.send("OK");
//     }
//     else
//         res.status(404).send("No existe el usuario");

// });






                                                            // Initialization of the server in the port number
                                                            // 3000.
// const portNumber = 3000;
// var server = app.listen(portNumber, function(){
//     console.log('Server ready and running on http://localhost:' + portNumber + '/productcreation');
//     console.log('Do not use 127.0.0.1, use localhost');
// })


// async function isAdmin(req){
//     let userSearchInstance = await UserModel.findOne({_id: req.userId});
//     console.log("Is admin =", userSearchInstance.admin);
//     return userSearchInstance.admin;
// }

app.use(require('./api'));

module.exports = app;