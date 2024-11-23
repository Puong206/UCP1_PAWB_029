const express = require('express');
const pupukController = require('../controllers/controller-pupuk');
const verifyUser = require('../configs/verify');
const router = express.Router();

router.get("/", pupukController.getAllPupuk);
router.get("/add", pupukController.addPupukForm);
router.post("/save", pupukController.savePupuk);
router.get("/edit/:id", pupukController.editPupukForm);
router.post("/edit/:id", pupukController.updatePupuk);
router.get("/delete/:id", pupukController.deletePupuk);

module.exports = router;
