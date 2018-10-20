const express = require('express');
const router = express.Router();
const chumLoginLogout = require('../app/controllers/chum_loginlogout_controllers');

// Authentications
const checkAuthSign = require('../app/auth/checkAuthSign');
const checkAuthVerify = require('../app/auth/checkAuthVerify');
const apiLimiter = require('../app/auth/apilimit');

router.post('/login', checkAuthSign, checkAuthVerify,  chumLoginLogout.chum_login);

router.get('/logout', chumLoginLogout.chum_logout);

router.get('/profile', chumLoginLogout.chum_profile);

router.get('/restricted', chumLoginLogout.chum_restrict);

module.exports = router;