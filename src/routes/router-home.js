const express = require('express');
const router = express.Router();
const {homeController} = require('../controllers');

router.get('/', homeController.home);
router.get('/home', homeController.getAllData);

module.exports = router;