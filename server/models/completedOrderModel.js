const mongoose = require("mongoose");

const completedOrderSchema = new mongoose.Schema({
    username: { type: String },
    date: { type: Date },
    price: { type: Number },
    orderItems: [{
        title: { type: String },
        amount: { type: Number },
        price: { type: Number },
        sizes: { type: String },
        breads: { type: String },
        vegetables: { type: Array },
        sauces: { type: Array },
        fillings: { type: Array }
    }]
});

module.exports = CompletedOrder = mongoose.model("completed orders", completedOrderSchema);