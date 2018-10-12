const express = require('express');
const router = express.Router();

const NewsfeedController = require ('../app/controllers/newsfeed_controller');
const restrict = require('../app/auth/restricting');

router.post('/:username/writepost', restrict(), NewsfeedController.handler_writePost);

router.get('/:username/', restrict(), NewsfeedController.handler_getPost);

router.post('/:username/sharedpost/:postid', restrict(), NewsfeedController.handler_sharePost);

router.post('/:username/comment/:postid', restrict(), NewsfeedController.handler_commentPost);

router.put('/:username/like/:postid/', restrict(), NewsfeedController.handler_likes);

router.put('/:username/unlike/:postid/', restrict(), NewsfeedController.handler_unlikes);

module.exports= router;