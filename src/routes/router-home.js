const router = require('express').Router();
const { home, getAllData } = require('../controllers/controller-home');

router.get('/', home);
router.get('/home', getAllData);

module.exports = router;
