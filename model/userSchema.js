const mongoose = require("mongoose");
 
 
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique ID for the admin
    userPassword: { type: String, required: true },
 
    role: { type: String, required: true }, // Admin, Manager, Staff)
});
 
module.exports = mongoose.model("User", UserSchema);
 
 