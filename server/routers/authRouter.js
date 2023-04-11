const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/signup',authController.signUpController);
router.post('/login',authController.logInController);
router.get('/refresh', authController.refreshAccessTokenController);

module.exports = router;