const router = require('express').Router();
const requireUser = require('../middlewares/requireUser');
const UserController = require('../controllers/userController');

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
router.get('/getpostsOfFollowing', requireUser, UserController.getPostsOfFollowing);

module.exports = router;