const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    getAllUsers,
    login,
    register,
    protected
 } = require('../controllers/userController');

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/protected', passport.authenticate('jwt', { session: false }), protected);

module.exports = router;