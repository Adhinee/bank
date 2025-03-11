const mongoose = require("mongoose");

const AccSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true }, 
    id: { type: Number, unique: true },  // Ensure the username is unique
    password: { type: String, required: true } // Password field
});

const AccModels = mongoose.model("bank", AccSchema);
module.exports = AccModels;


