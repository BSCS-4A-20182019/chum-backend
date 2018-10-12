const express = require('express');
const router = express.Router();

const SettingsController = require ('../app/controllers/settings_controller');
const restrict = require('../app/auth/restricting');

router.put('/:username/editprofile', restrict(), SettingsController.handler_editprofile);

router.get('/:username/accountsettings', restrict(), SettingsController.handler_accountsettings);

router.patch('/:username/updateaccount', restrict(), SettingsController.handler_updateaccount);

router.get('/logout', restrict(), SettingsController.handler_logout);

module.exports= router;