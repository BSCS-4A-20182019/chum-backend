const express = require('express');
const router = express.Router();

const RankingController = require ('../app/controllers/chum_ranking_controller');
const restrict = require('../app/auth/restricting');

router.get('/global/ranking', restrict(), RankingController.rank_global_get);
router.get('/chums/:username', restrict(), RankingController.rank_chum_get);
router.put('/:username/levelup', restrict(), RankingController.rank_level_get);
router.get('/:username/ranklvl', restrict(), RankingController.rank_update_put);

module.exports= router;