const mongoose = require('mongoose');
const CheckoutWaitSchema = mongoose.Schema(
   {    
        email: String,
        name: String,
        phone: String,
        address: String,
        note: String,
        totalquantity: Number,
        total: Number,
        status: Boolean,
   }
);
const CheckoutWaitModel = mongoose.model("CheckoutWait", CheckoutWaitSchema, "checkoutwait");
module.exports = CheckoutWaitModel;