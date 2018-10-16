const express = require('express');
const router = express.Router();

const NewsfeedController = require ('../app/controllers/newsfeed_controller');

router.post('/:username/writepost', NewsfeedController.handler_writePost);

router.get('/:username/', NewsfeedController.handler_getPost);

router.post('/:username/sharedpost/:postid', NewsfeedController.handler_sharePost);

router.post('/:username/comment/:postid', NewsfeedController.handler_commentPost);

router.put('/:username/like/:postid/', NewsfeedController.handler_likes);

router.put('/:username/unlike/:postid/', NewsfeedController.handler_unlikes);

module.exports= router;