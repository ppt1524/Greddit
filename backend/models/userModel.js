const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    email: {
      type: String,
      // required: true,
      unique : true
    },
    password: {
      type: String,
      // required: true
    },
    age: {
      type: String,
      // required: true,
    },
    firstName : {
      type : String,
      // required: true,
    },
    lastName : {
      type : String,
      // required: true,
    },
    ContactNumber : {
      type : String,
      // required: true,
    },
    UserName : {
      type : String,
      // required: true,
    },
    Followers : {
      type : Array,
    },
    Following : {
      type : Array,
    },
    SavedPost : {
      type : Array
    }
  },
);

module.exports = mongoose.model("Contact", contactSchema);