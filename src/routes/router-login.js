const express = require('express');
const router = express.Router();
const { loginAuth, logout } = require('../controllers/controller-login');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, (req, res) => {
    res.render('login');
});

router.get('/logout', logout);

router.post('/auth', loginAuth);

module.exports = router;
