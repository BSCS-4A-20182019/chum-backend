const express = require('express');
const router = express.Router();

const TimeLineController = require ('../app/controllers/chum_timeline_controller');
const restrict = require('../app/auth/restricting');

router.post('/:username/writepost', restrict(), TimeLineController.handler_writePost);

router.get('/:username', restrict(), TimeLineController.handler_getPost);

router.post('/:username/comment/:postid', restrict(), TimeLineController.handler_commentPost);


module.exports= router;