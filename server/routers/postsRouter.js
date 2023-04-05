const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.get('/all',postsController.getAllPostsController);

module.exports = router;