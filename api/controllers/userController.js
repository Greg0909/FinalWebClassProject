const UserServices = require('../../services/userServices');

module.exports = {

    createUser: async function(req, res){
        console.log("Creating a new user");

        let createdUser = await UserServices.createUser(req.body);

        if(createdUser)
            res.send(createdUser);
        else
            res.status(503).send(`error: the user could not be created`);

    },

    getUser: async function(req, res){
        if(!await UserServices.isAdmin(req) && req.params.id != req.userId){
            res.status(403).send(`You are not admin`);
            return;
        }

        console.log("Entering GET of id:", req.params.id);
    
        let userSearchInstance = await UserServices.getUser(req.params.id);
        if(userSearchInstance)
            res.send( userSearchInstance);
        else
            res.send("No user found with the specified id");
    },

    deleteUser: async function(req, res){
        if(!await UserServices.isAdmin(req) && req.params.id != req.userId){
            res.status(403).send(`You are not admin`);
            return;
        }
    
        console.log("Entering DELETE to delete id:", req.params.id);
    
        await UserServices.deleteUser(req.params.id);
        res.send("OK");
    },

    updateUser: async function(req, res){
        if(!await UserServices.isAdmin(req) && req.params.id != req.userId){
            res.status(403).send(`You are not admin`);
            return;
        }
    
        console.log("Editing instance with id:", req.params.id);

        if(UserServices.updateUser(req.params.id, req.body))
            res.send("OK");
        else
            res.status(503).send(`error: no se encontro el usuario`);

    },

}