const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function register_validation(data) {
  // replace the empty with null strings for the validator to be able to work
  // required field
  let flag = false;
  if (isEmpty(data.age)) {
    data.age = "";
  }
  // required
  if (isEmpty(data.email)) {
    data.email = "";
  }
  // required
  if (isEmpty(data.firstName)) {
    data.firstName = "";
  }
  // required
  if (isEmpty(data.ContactNumber)) {
    data.ContactNumber = "";
  }
  // required
  if (isEmpty(data.lastName)) {
    data.lastName = "";
  }
  // required
  if (isEmpty(data.password)) {
    data.password = "";
  }
  // required
  if (isEmpty(data.UserName)) {
    data.UserName = "";
  }
  // Create a variable to store errors
  let errors = {};
  if (validator.isEmpty(data.age)) {
    flag = true;
    errors.age = "Age Field Empty";
  }
  if (validator.isEmpty(data.email)) {
    flag = true;
    errors.email = "Email Field Empty";
  } else if (validator.isEmail(data.email) == false) {
    flag = true;
    errors.email = "Enter a valid Email address";
  }
  if (validator.isEmpty(data.firstName)) {
    flag = true;
    errors.firstName = "firstName Field Empty";
  }
  if (validator.isEmpty(data.ContactNumber)) {
    flag = true;
    errors.ContactNumber = "Contact-Number Field Empty";
  }
  if (validator.isEmpty(data.lastName)) {
    flag = true;
    errors.lastName = "lastName Field Empty";
  }
  if (validator.isEmpty(data.UserName)) {
    flag = true;
    errors.UserName = "UserName Field Empty";
  }
  if (validator.isEmpty(data.password)) {
    flag = true;
    errors.password = "Password Field Empty";
  }
  return { errors, valid_bit: !flag };
};