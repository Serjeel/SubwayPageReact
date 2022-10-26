const express = require('express');
const router = express.Router();

const {
getAllFood
} = require('../controllers/foodController');

router.get('/getAllFood', getAllFood);

module.exports = router;