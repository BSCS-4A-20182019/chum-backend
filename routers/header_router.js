const express = require('express');
const router = express.Router();

const HeaderController = require ('../app/controllers/header_controller');

router.get('/newsfeed', HeaderController.handler_newsfeed);

router.get('/profile/:username', HeaderController.handler_username);

router.get('/profile/:username/notifications', HeaderController.handler_notifications);

router.get('/profile/:username/savedposts', HeaderController.handler_savedposts);

router.post('/search', HeaderController.handler_search);

router.post('/upload', HeaderController.handler_upload);

module.exports= router;