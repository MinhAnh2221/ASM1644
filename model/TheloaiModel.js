const mongoose = require('mongoose');
const TheloaiSchema = mongoose.Schema(
   {
        "theloai": String,
   }
);
const TheloaiModel = mongoose.model("Theloai", TheloaiSchema, "theloai");
module.exports = TheloaiModel;