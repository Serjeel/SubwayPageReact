const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    menu: { type: Array },
    fillings: { type: Object },
    volumes: { type: Object },
    sizes: { type: Object },
    breads: { type: Object },
    vegetables: { type: Object },
    sauces: { type: Object },
    markets: { type: Object }
});

module.exports = Food = mongoose.model("products", foodSchema);