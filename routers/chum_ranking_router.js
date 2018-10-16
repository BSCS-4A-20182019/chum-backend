const express = require('express');
const router = express.Router();

const RankingController = require ('../app/controllers/chum_ranking_controller');

router.get('/global/ranking', RankingController.rank_global_get);
router.get('/chums/:username', RankingController.rank_chum_get);
router.put('/:username/levelup', RankingController.rank_level_get);
router.get('/:username/ranklvl', RankingController.rank_update_put);

module.exports= router;