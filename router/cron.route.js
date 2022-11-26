const express = require('express');
const { isActive } = require('../middleware/system.middleware');
const cronController = require('../controllers/cron.controller');
const router = express.Router();

router.get('/getHistory/:token', isActive, cronController.getHistory);

router.get('/reward/:token', isActive, cronController.reward);

router.get('/refund/:token', isActive, cronController.refund);

router.get('/rewardError/:token', isActive, cronController.rewardError);

router.get('/rewardId/:transId/:token', isActive, cronController.rewardID);

router.get('/rewardTOP/:token', isActive, cronController.rewardTOP);

module.exports = router;