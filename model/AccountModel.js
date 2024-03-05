const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema(
   {    
         fullname: String,
         phone: Number,
         address: String,
        email: String,
        password: String,
   }
);
const AccountModel = mongoose.model("account", AccountSchema, "account");
module.exports = AccountModel;