const mongoose = require("mongoose");

const UserDAtaSchema = new mongoose.Schema({
    description: { type: String }, 
    id: { type: Number },  // Ensure the username is unique
    cash: { type: Number }  // Password field
});
const UserModels = mongoose.model("user", UserDAtaSchema);
module.exports = UserModels;
