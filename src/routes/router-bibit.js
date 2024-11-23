const express = require("express");
const router = express.Router();
const bibitController = require("../controllers/controller-bibit");
const verifyUser = require("../configs/verify");

router.get("/", verifyUser.isLogin, bibitController.getAllBibit);
router.get("/add", verifyUser.isLogin, bibitController.addBibitForm);
router.post("/save", verifyUser.isLogin, bibitController.saveBibit);
router.get("/edit/:id", verifyUser.isLogin, bibitController.editBibitForm);
router.post("/edit/:id", verifyUser.isLogin, bibitController.updateBibit);
router.get("/delete/:id", verifyUser.isLogin, bibitController.deleteBibit);

module.exports = router;