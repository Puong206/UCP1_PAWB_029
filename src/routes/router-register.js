const express = require('express');
const router = express.Router();
const { formRegister, saveRegister } = require('../controllers/controller-register');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, formRegister);

router.post('/save', verifyUser.isLogout, saveRegister);

module.exports = router;
