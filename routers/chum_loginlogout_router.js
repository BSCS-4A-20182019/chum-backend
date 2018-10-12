const express = require('express');
const router = express.Router();
const chumLoginLogout = require('../app/controllers/chum_loginlogout_controllers');

// Authentications
const checkAuthSign = require('../app/auth/checkAuthSign');
const checkAuthVerify = require('../app/auth/checkAuthVerify');
const apiLimiter = require('../app/auth/apilimit');
const restrict = require('../app/auth/restricting');
const restrictrev = require('../app/auth/restricting_rev');

router.post('/login', restrictrev(), apiLimiter, checkAuthSign, checkAuthVerify,  chumLoginLogout.chum_login);

router.get('/logout', restrict(), chumLoginLogout.chum_logout);

router.get('/profile', restrict(), chumLoginLogout.chum_profile);

router.get('/restricted', chumLoginLogout.chum_restrict);

module.exports = router;