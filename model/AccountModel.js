const mongoose = require('mongoose');
const AccountSchema = mongoose.Schema(
   {
        "email": String,
        "password": String
   }
);
const AccountModel = mongoose.model("Account", AccountSchema, "account");
module.exports = AccountModel;