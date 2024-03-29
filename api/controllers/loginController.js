const UserServices = require('../../services/userServices');

module.exports = {

    logUser: async function(req, res){
        console.log("Logging the user with attributes:", req.body);

        const accessToken = await UserServices.logUser(req.body);
        if( accessToken != null)
        {
            res.cookie("jwt", accessToken, /*{secure:true, httpOnly:true}*/);
            res.send("OK");
        }
        else
            res.status(404).send("No existe el usuario");
    },

    logoutUser: async function(req, res){
        console.log("Logging out user...");
        // const accessToken = await UserServices.logoutUser();
        // res.cookie("jwt", accessToken);
        res.clearCookie("jwt");
        console.log("Logout successfull");
        res.send("Logout succesfull");
    },

}