const express = require('express');
const router = express.Router();

const ChumReqController = require ('../app/controllers/chum_req_controller');
const restrict = require('../app/auth/restricting');

router.get('/:username/chumrequests', restrict(), ChumReqController.chumreq_get);

router.delete('/:username/chumrequests/ignore/:chumId', restrict(), ChumReqController.chumreqdelete_ignore);

router.delete('/:username/chumrequests/accept/:chumId', restrict(), ChumReqController.chumreqdelete_accept);

router.post('/:username/chumrequests/send/:users', restrict(), ChumReqController.chumreqsend_request);

module.exports= router;