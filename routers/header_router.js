const express = require('express');
const router = express.Router();

const HeaderController = require ('../app/controllers/header_controller');
const restrict = require('../app/auth/restricting');

router.get('/newsfeed', restrict(), HeaderController.handler_newsfeed);

router.get('/profile/:username', restrict(), HeaderController.handler_username);

router.get('/profile/:username/notifications', restrict(), HeaderController.handler_notifications);

router.get('/profile/:username/savedposts', restrict(), HeaderController.handler_savedposts);

router.post('/search', HeaderController.handler_search);

router.post('/upload', HeaderController.handler_upload);

module.exports= router;