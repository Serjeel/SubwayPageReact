const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    getAllCompletedOrders,
    createNewCompletedOrder
} = require('../controllers/completedOrderController');

router.get('/getAllCompletedOrders', getAllCompletedOrders);
router.post('/createNewCompletedOrder', passport.authenticate('jwt', { session: false }), createNewCompletedOrder);

module.exports = router;