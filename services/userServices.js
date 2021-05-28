const mongoose = require('mongoose');
const crypto = require('crypto');
let jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

async function createUser(data){
    let porductSearchInstance = await UserModel.findOne(data);
    let createdUser = null;

    if(!porductSearchInstance){
        data.admin = false;
        let productInstanceData = new UserModel(data);
        createdUser = await productInstanceData.save();
    }

    return createdUser;
}

async function logUser(data){
    const hash = crypto.getHashes();  
    
    hashPassword = crypto.createHash('sha1').update(data.password).digest('hex');
    data.password = hashPassword;


    let porductSearchInstance = await UserModel.findOne(data);

    if(porductSearchInstance){
        let payload = {id: porductSearchInstance._id};

        let accessToken = jwt.sign(payload, "webclass", {
            algorithm: "HS256",
            expiresIn: 60
        })

        console.log("El usuario si existe");
        return accessToken;
    }
    else
        return null;
}

async function logoutUser(){
    let accessToken = jwt.sign({}, "webclass", {
        algorithm: "HS256",
        expiresIn: 0
    })

    return accessToken
}

async function addAdminUser(){
    let productInstanceData = new UserModel({email: 'admin@itesm.mx', password: "pass",admin: true});
    productInstanceData.save((err) => {
        if (err) console.log(`error: ${err}`); 
        else {
            console.log("Se creo la cuenta de administrador con email 'admin@itesm.mx' y contraseña 'pass'");
        }
    });
}

async function deleteAllUsers(){
    UserModel.deleteMany({ }, function (err) {
        if (err) console.log(err);
    });
}

async function isAdmin(req){
    console.log("is Admin function was passed an id of: ", req.userId);
    let userSearchInstance = await UserModel.findOne({_id: req.userId});
    if(userSearchInstance){
        console.log("Is admin =", userSearchInstance.admin);
        return userSearchInstance.admin;
    }
    return false;
}

module.exports = {
    createUser,
    logUser,
    logoutUser,
    isAdmin,
    addAdminUser,
    deleteAllUsers
};