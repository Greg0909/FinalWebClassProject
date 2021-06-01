
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



                                                            // Is the middleware that checks if the user
                                                            // is logged through the cookie. If its not logged
                                                            // the server redirects to the login page. This does
                                                            // not apply to the signup and login page.
app.use((req, res, next)=>{

    if(req.url==="/login" || req.url==="/signup")
    {
        next();
        return;
    }

    if(req.url.indexOf("/products") > -1 || req.url.indexOf("/productEditor") > -1 || req.url.indexOf("/productdashboard") > -1  ||
        (req.url.indexOf("/users") > -1 && req.url.indexOf("/users/create") == -1) || req.url.indexOf("/productcreation") > -1 || req.url.indexOf("/cart") > -1 ||
        req.url.indexOf("/completePurchase") > -1 || req.url.indexOf("/usereditor") > -1)
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



                                                            // Conecting to the database.

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

    UserServices.deleteAllUsers();
    UserServices.addAdminUser();

}





app.use(require('./api'));

module.exports = app;