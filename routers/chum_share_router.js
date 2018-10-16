const express = require('express');
const router = express.Router();

const ShareController = require ('../app/controllers/chum_share_controller');

router.put('/:username/share/:postid/likes', ShareController.handler_sharelikes);

router.put('/:username/share/:postid/unlike', ShareController.handler_shareunlikes);

router.post('/:username/share/comment/:postid', ShareController.handler_share_commentPost);

module.exports= router;