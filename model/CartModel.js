const mongoose = require('mongoose');
const CartSchema = mongoose.Schema(
   {    
        email: String,
        ten: String,
        anh: String,
        gia: Number,
        soluong: Number,
        tongtien: Number,

   }
);
const CartModel = mongoose.model("Cart", CartSchema, "cart");
module.exports = CartModel;