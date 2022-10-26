const { validateChange, validateCreate, productAvailability,
  calculatePrice, ingredientAvailability, validateUserOrderCreation,
  validateUserOrderDeleteChange,
  arrayOfIngredients } = require("../validation/validation")

const { v4: uuidv4 } = require('uuid');

const Order = require("../models/orderModel");
const Food = require("../models/foodModel");

let products = []
Food.find().then(result => {
  products = result
});

module.exports.getAllOrders = async (req, res, next) => {
  Order.find().then(result => {
    res.send(result.filter(item => item.username === req.query.username));
  });
};

module.exports.createNewOrder = async (req, res, next) => {
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  const body = req.body;
  const orderId = uuidv4();

  if (validateCreate(body) && productAvailability(body.title, products) &&
    ingredientAvailability(body, products) && body.bread) {
    const order = new Order({
      title: body.title,
      orderId: orderId,
      amount: body.amount,
      price: calculatePrice(body, body.title, products),
      username: token.username,
      size: body.size,
      bread: body.bread,
      vegetables: arrayOfIngredients(body, "vegetables", products),
      sauces: arrayOfIngredients(body, "sauces", products),
      fillings: arrayOfIngredients(body, "fillings", products)
    });
    await order.save().then(result => Order.find({ orderId }))
      .then(result => { res.send(result.filter(item => item.username === token.username)) });
  } else if (validateCreate(body) && productAvailability(body.title, products)) {
    const order = new Order({
      title: body.title,
      orderId: orderId,
      amount: body.amount,
      price: calculatePrice(body, body.title, products),
      username: token.username
    });
    await order.save().then(result => Order.find({ orderId }))
      .then(result => { res.send(result) });
  } else {
    res.status(422).send('Error! Params not correct');
  }
}

module.exports.changeOrderInfo = async (req, res, next) => {
  const body = req.body;
  let selectedOrder = {}
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  let title = "";
  await Order.find({ orderId: body.orderId }).then(result => {
    title = result[0].title;
    selectedOrder = result[0];
  })
  if (validateUserOrderDeleteChange(token, selectedOrder)) {
    if (validateChange(body) && productAvailability(title, products)
      && ingredientAvailability(body, products) && selectedOrder.bread) {
      Order.updateOne({ orderId: req.body.orderId }, {
        title: Order.find({ orderId: body.orderId }).title,
        amount: body.amount,
        price: calculatePrice(body, title, products),
        size: body.size,
        bread: body.bread,
        vegetables: arrayOfIngredients(body, "vegetables", products),
        sauces: arrayOfIngredients(body, "sauces", products),
        fillings: arrayOfIngredients(body, "fillings", products)
      }).then(result => {
        Order.find({ orderId: req.body.orderId }).then(result => {
          res.send(result);
        });
      })
    } else {
      res.status(422).send('Error! Params not correct');
    }
  } else {
    res.status(422).send('Error! Incorrect user');
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  // Теперь проверить всё на фронте и проверить через postman delete
  const body = req.query;
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  let selectedOrder = {}

  await Order.find({ orderId: body.orderId }).then(result => {
    if (result) {
      selectedOrder = result[0];
    }
  })
  if (validateUserOrderDeleteChange(token, selectedOrder)) {
    Order.deleteOne({ orderId: req.query.orderId }).then(result =>
      Order.find({ username: req.query.username }).then(result => {
        res.send(result)
      }))
  } else {
    res.status(422).send('Error! Incorrect user');
  }
}

