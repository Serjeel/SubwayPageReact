const CompletedOrder = require("../models/completedOrderModel");
const Order = require("../models/orderModel");
const { calculateCompletedPrice } = require("../validation/validation");

module.exports.getAllCompletedOrders = async (req, res, next) => {
    CompletedOrder.find().then(result => {
        res.send(result);
    });
};

module.exports.createNewCompletedOrder = async (req, res, next) => {
    let orderItems = []
    const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
    await Order.find().then(result => {
        orderItems = result
    });

    const order = new CompletedOrder({
        username: token.username,
        date: Date.now(),
        price: calculateCompletedPrice(orderItems),
        orderItems
    });
    await order.save().then(result => CompletedOrder.find())
        .then(result => { res.send(result) });
    await Order.deleteMany({ username: token.username })
}