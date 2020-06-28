const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
  Date: {
    type: Date,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  deleveryDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
  orderAmount: {
    type: Number,
  },
  paid: {
    type: Boolean,
  },
});

module.exports = ("Order", OrderSchema);
