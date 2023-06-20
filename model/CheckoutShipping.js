const mongoose = require('mongoose');
const CheckoutShippingSchema = mongoose.Schema(
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
const CheckoutShippingModel = mongoose.model("CheckoutShipping", CheckoutShippingSchema, "checkoutshipping");
module.exports = CheckoutShippingModel;