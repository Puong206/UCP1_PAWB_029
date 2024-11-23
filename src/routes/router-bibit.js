const express = require('express');
const router = express.Router();
const { getAllBibit, formAddBibit, saveBibit, formEditBibit, updateBibit, deleteBibit } = require('../controllers/controller-bibit');

router.get('/bibit', getAllBibit);
router.get('/bibit/add', formAddBibit);
router.post('/bibit/save', saveBibit);
router.get('/bibit/edit/:id', formEditBibit);
router.post('/bibit/edit/:id', updateBibit);
router.get('/bibit/delete/:id', deleteBibit);

module.exports = router;