const express = require('express');
const router = express.Router();

const ChumListController = require ('../app/controllers/chum_list_controller');
const restrict = require('../app/auth/restricting');

router.get('/chumlist/:username', restrict(), ChumListController.handler_getChumList);
router.get('/chumlist/:username/list', restrict(), ChumListController.handler_getChumListNumber);



module.exports= router;