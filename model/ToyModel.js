const mongoose = require('mongoose');
const ToySchema = mongoose.Schema(
   {
      "ten": String,
      "masp": String,
      "xuatsu": String,
      "gia": Number,
      "anh":String,
      "theloai": String,
      "soluong": Number,
   }
);
const ToyModel = mongoose.model("Toy", ToySchema, "toys");
module.exports = ToyModel;