const express = require('express');
const router = express.Router();
const {bibitController} = require('../controllers').bibit;

router.get('/bibit', bibitController.getAllBibit);
router.get('/bibit/add', bibitController.formAddBibit);
router.post('/bibit/save', bibitController.saveBibit);
router.get('/bibit/edit/:id', bibitController.formEditBibit);
router.post('/bibit/edit/:id', bibitController.updateBibit);
router.get('/bibit/delete/:id', bibitController.deleteBibit);

module.exports = router;