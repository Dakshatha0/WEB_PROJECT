const router = require('express').Router();
const postsController = require('../controllers/postsController');
const requireUser = require('../middlewares/requireUser');

router.get('/all', requireUser , postsController.getAllPostsController);
router.post('/', requireUser, postsController.getAllPostsController);


module.exports = router;