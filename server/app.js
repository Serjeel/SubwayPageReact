require("./config/database").connect();
const express = require("express");
const passport = require('passport')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

const foodRoute = require("./routes/foodRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const completedOrderRoute = require("./routes/completedOrderRoute")

app.use("/food", foodRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/completedOrder", completedOrderRoute);

module.exports = app;