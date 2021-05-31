const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    profilePicture: String,
    name: String,
    admin: Boolean
});

                                                            // Before saving the user instance, the password is 
                                                            // hashed to prevent storing it in plain text.
userSchema.pre('save', function(){
    const hash = crypto.getHashes();  
                                                            // 'digest' is the output of hash function containing 
                                                            // only hexadecimal digits
    hashPassword = crypto.createHash('sha1').update(this.password).digest('hex');
    this.password = hashPassword;
});

                                                            


module.exports = mongoose.model('UserDB', userSchema);