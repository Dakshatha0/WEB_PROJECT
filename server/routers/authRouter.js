const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/all',authController.signUpController);
router.post('/login',authController.logInController);
router.post('/refresh', authController.refreshAccessTokenController);

module.exports = router;