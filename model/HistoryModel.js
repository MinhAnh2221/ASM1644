const mongoose = require('mongoose');
const HistoryModelSchema = mongoose.Schema(
   {    
        email: String,
        name: String,
        phone: String,
        address: String,
        note: String,
        totalquantity: Number,
        total: Number,
   }
);
const HistoryModelModel = mongoose.model("HistoryModel", HistoryModelSchema, "history");
module.exports = HistoryModelModel;