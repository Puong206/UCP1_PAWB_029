const express = require('express');
const pupukController = require('../controllers/controller-pupuk');
const verifyUser = require('../configs/verify');
const router = express.Router();

router.get("/", verifyUser.isLogin, pupukController.getAllPupuk);
router.get("/add", verifyUser.isLogin, pupukController.addPupukForm);
router.post("/save", verifyUser.isLogin, pupukController.savePupuk);
router.get("/edit/:id", verifyUser.isLogin, pupukController.editPupukForm);
router.post("/edit/:id", verifyUser.isLogin, pupukController.updatePupuk);
router.get("/delete/:id", verifyUser.isLogin, pupukController.deletePupuk);

module.exports = router;
