const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./Orders");

let UserSchema = new Schema({
  role: {
    type: String,
    //Admin, Manager, Customer, None
  },
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

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
