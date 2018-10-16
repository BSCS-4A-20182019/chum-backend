const express = require('express');
const router = express.Router();

const ChumListController = require ('../app/controllers/chum_list_controller');

router.get('/chumlist/:username', ChumListController.handler_getChumList);
router.get('/chumlist/:username/list', restrict(), ChumListController.handler_getChumListNumber);



module.exports= router;