const express = require('express');
const router = express.Router();

const ChumReqController = require ('../app/controllers/chum_req_controller');

router.get('/:username/chumrequests', ChumReqController.chumreq_get);

router.delete('/:username/chumrequests/ignore/:chumId', ChumReqController.chumreqdelete_ignore);

router.delete('/:username/chumrequests/accept/:chumId', ChumReqController.chumreqdelete_accept);

router.post('/:username/chumrequests/send/:users', ChumReqController.chumreqsend_request);

module.exports= router;