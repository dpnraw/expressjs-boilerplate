
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, max_length: 30 },
  password: { 
    type: String, 
    required: [true, 'Password must be provided'], 
    max_length: 100},
});


module.exports = {userModel:mongoose.model("Users", userSchema)};
