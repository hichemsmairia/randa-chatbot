const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  } ,
  lng:{
    type:Number,
    required: true


  },
  lat:{
    type:Number,
    required: true


  }
});
module.exports = User = mongoose.model("users", UserSchema);