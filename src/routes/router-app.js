const router = require('express').Router();

// Mengimpor controller sesuai dengan aplikasi
const homeController = require('../controllers').home;
const bibitController = require('../controllers').bibit;
const pupukController = require('../controllers').pupuk;
const loginController = require('../controllers').login;
const registerController = require('../controllers').register;
const verifyUser  = require('../configs/verify'); // Jika perlu verifikasi login

// Rute untuk Home
router.get('/', verifyUser .isLogin, homeController.home);

// Rute untuk Bibit
router.get('/bibit', verifyUser .isLogin, bibitController.getAllBibit);
router.get('/bibit/add', verifyUser .isLogin, bibitController.formAddBibit);
router.post('/bibit/save', verifyUser .isLogin, bibitController.saveBibit);
router.get('/bibit/edit/:id', verifyUser .isLogin, bibitController.formEditBibit);
router.post('/bibit/edit/:id', verifyUser .isLogin, bibitController.updateBibit);
router.get('/bibit/delete/:id', verifyUser .isLogin, bibitController.deleteBibit);

// Rute untuk Pupuk
router.get('/pupuk', verifyUser .isLogin, pupukController.getAllPupuk);
router.get('/pupuk/add', verifyUser .isLogin, pupukController.formAddPupuk);
router.post('/pupuk/save', verifyUser .isLogin, pupukController.savePupuk);
router.get('/pupuk/edit/:id', verifyUser .isLogin, pupukController.formEditPupuk);
router.post('/pupuk/edit/:id', verifyUser .isLogin, pupukController.updatePupuk);
router.get('/pupuk/delete/:id', verifyUser .isLogin, pupukController.deletePupuk);

// Rute untuk Login
router.get('/login', loginController.loginPage);
router.post('/login/auth', loginController.loginAuth);

// Rute untuk Register
router.get('/register', registerController.registerPage);
router.post('/register/save', registerController.saveRegister);

module.exports = router;