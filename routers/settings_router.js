const express = require('express');
const router = express.Router();

const SettingsController = require ('../app/controllers/settings_controller');

router.put('/:username/editprofile', SettingsController.handler_editprofile);

router.get('/:username/accountsettings', SettingsController.handler_accountsettings);

router.patch('/:username/updateaccount', SettingsController.handler_updateaccount);

router.get('/logout', SettingsController.handler_logout);

module.exports= router;