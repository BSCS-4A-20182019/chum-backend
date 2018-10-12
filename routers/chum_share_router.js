const express = require('express');
const router = express.Router();

const ShareController = require ('../app/controllers/chum_share_controller');
const restrict = require('../app/auth/restricting');

router.put('/:username/share/:postid/likes', restrict(), ShareController.handler_sharelikes);

router.put('/:username/share/:postid/unlike', restrict(), ShareController.handler_shareunlikes);

router.post('/:username/share/comment/:postid', restrict(), ShareController.handler_share_commentPost);

module.exports= router;