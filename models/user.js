const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userfirstname: String,
    userlastname: String,
    email: String,
    password: String,
    avatar: String
});

const User = mongoose.model("users", UserSchema);

module.exports = User;