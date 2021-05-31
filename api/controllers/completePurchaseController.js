
module.exports = {

    completePurchase: async function(req, res){
        console.log("Completing the purchase of the following items:");
        console.log(req.body);

        res.status(200).send("OK");
    },

}