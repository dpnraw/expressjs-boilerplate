//  this schema is for connecting existing collection of mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantsSchema = new Schema({});
  
  
module.exports = mongoose.model("restaurants", restaurantsSchema);