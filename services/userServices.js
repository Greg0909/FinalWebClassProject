const mongoose = require('mongoose');
const crypto = require('crypto');
const adminImage = require('../config/adminBase64Image');
let jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

async function createUser(data){
    let userSearchInstance = await UserModel.findOne({email:data.email});
    let createdUser = null;

    if(!userSearchInstance){
        data.admin = false;
        let userInstanceData = new UserModel(data);
        createdUser = await userInstanceData.save();
        console.log("The id of the new user is:", createdUser._id);
    }

    return createdUser;
}

async function getUser(id){
    return await UserModel.findOne({_id: id});
}

async function deleteUser(id){
    await UserModel.deleteOne({_id: id});
}

async function updateUser(id, data){
    let userSearchInstance = await UserModel.findOne({_id: id});

    if(data.profilePicture=="")
        delete data.profilePicture;
    if(data.password=="")
        delete data.password;
    else{
                                                            // Before updating the user instance, the password is 
                                                            // hashed to prevent storing it in plain text.
        const hash = crypto.getHashes();  
                                                            // 'digest' is the output of hash function containing 
                                                            // only hexadecimal digits
        hashPassword = crypto.createHash('sha1').update(data.password).digest('hex');
        data.password = hashPassword;
    }
    
    if(userSearchInstance){
        await UserModel.updateOne({_id: id}, data);
        return true;
    }
    return false;
}

async function logUser(data){
    const hash = crypto.getHashes();  
    
    hashPassword = crypto.createHash('sha1').update(data.password).digest('hex');
    data.password = hashPassword;


    let userSearchInstance = await UserModel.findOne(data);

    if(userSearchInstance){
        let payload = {id: userSearchInstance._id};

        let accessToken = jwt.sign(payload, "webclass", {
            algorithm: "HS256",
            expiresIn: 86400 // 1 day in seconds
        })

        console.log("El usuario si existe");
        return accessToken;
    }
    else
        return null;
}

// async function logoutUser(){
//     let accessToken = jwt.sign({}, "webclass", {
//         algorithm: "HS256",
//         expiresIn: 0
//     })

//     return accessToken
// }

async function addAdminUser(){
    let userInstanceData = new UserModel({name:"Admin", email: 'admin@itesm.mx', password: "pass",admin: true, profilePicture: adminImage.adminPreviewImage});
    userInstanceData.save((err) => {
        if (err) console.log(`error: ${err}`); 
        else {
            console.log("Se creo la cuenta de administrador con email 'admin@itesm.mx' y contraseña 'pass' con id:", userInstanceData._id);
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
    getUser,
    deleteUser,
    updateUser,
    logUser,
//    logoutUser,
    isAdmin,
    addAdminUser,
    deleteAllUsers
};