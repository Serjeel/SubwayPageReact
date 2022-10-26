const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  title: { type: String },
  username: { type: String },
  orderId: { type: String },
  amount: { type: Number },
  price: { type: Number },
  size: { type: String },
  bread: { type: String },
  vegetables: { type: Array },
  sauces: { type: Array },
  fillings: { type: Array }
});

module.exports = Order = mongoose.model("orders", orderSchema);