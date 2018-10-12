const express = require('express');
const router = express.Router();

const CreateController = require ('../user-control/user_account_controller');
const restrict = require('../app/auth/restricting');
const restrictsignup = require('../app/auth/restricting_rev');

router.get('/users', restrict(), CreateController.handler_get);
router.post('/createuser', restrictsignup(), CreateController.post_account);
router.get('/userlist', restrict(), CreateController.users_list);
router.get('/userlist/:username', restrict(), CreateController.user_list);

module.exports= router;