const express = require('express');
const router = express.Router();
const {pupukController} = require('../controllers').pupuk;

router.get('/pupuk', pupukController.getAllPupuk);
router.get('/pupuk/add', pupukController.formAddPupuk);
router.post('/pupuk/save', pupukController.savePupuk);
router.get('/pupuk/edit/:id', pupukController.formEditPupuk);
router.post('/pupuk/edit/:id', pupukController.updatePupuk);
router.get('/pupuk/delete/:id', pupukController.deletePupuk);

module.exports = router;