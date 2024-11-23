const express = require("express");
const router = express.Router();
const bibitController = require("../controllers/controller-bibit");
const verifyUser = require("../configs/verify");

router.get("/", bibitController.getAllBibit);
router.get("/add", bibitController.addBibitForm);
router.post("/save", bibitController.saveBibit);
router.get("/edit/:id", bibitController.editBibitForm);
router.post("/edit/:id", bibitController.updateBibit);
router.get("/delete/:id", bibitController.deleteBibit);

module.exports = router;