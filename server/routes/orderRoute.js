const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    getAllOrders,
    createNewOrder,
    changeOrderInfo,
    deleteOrder
 } = require('../controllers/orderController');

router.get('/getAllOrders', getAllOrders);
router.post('/createNewOrder', passport.authenticate('jwt', { session: false }), createNewOrder);
router.patch('/changeOrderInfo', passport.authenticate('jwt', { session: false }), changeOrderInfo);
router.delete('/deleteOrder', passport.authenticate('jwt', { session: false }), deleteOrder);

module.exports = router;