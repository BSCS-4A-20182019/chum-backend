const express = require('express');
const router = express.Router();

const TimeLineController = require ('../app/controllers/chum_timeline_controller');

router.post('/:username/writepost', TimeLineController.handler_writePost);

router.get('/:username', TimeLineController.handler_getPost);

router.post('/:username/comment/:postid', TimeLineController.handler_commentPost);


module.exports= router;