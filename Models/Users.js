const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./Orders");

let UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  category: {
    type: String,
    //personal, company
  },
  userNmae: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  userRelation: {
    type: String,
    //Lead, Opportunity, Contact, Account
  },
  Orders: [
    {
      type: Schema.Types.OrderId,
      ref: "Order",
    },
  ],
});

module.exports = ("User", UserSchema);
