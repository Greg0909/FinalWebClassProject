const UserServices = require('../../services/userServices');

module.exports = {

    createUser: async function(req, res){
        console.log("Creating a new user with attributes:", req.body);

        let createdUser = await UserServices.createUser(req.body);

        if(createdUser)
            res.send(createdUser);
        else
            res.status(503).send(`error: the product could not be created`);

    },

}