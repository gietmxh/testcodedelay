const express = require('express');
const apiController = require('../controllers/api.controller');
const momoRoute = require('../router/momo.route');
const jackpotRoute = require('../router/jackpot.route');
const musterRoute = require('../router/muster.route');
const { isActive } = require('../middleware/system.middleware');
const router = express.Router();

router.use('/momo', momoRoute);

router.use('/jackpot', jackpotRoute);

router.use('/muster', musterRoute);

router.get('/getGame', isActive, apiController.getGame);

router.get('/getPhone', isActive, apiController.getPhone);

router.post('/getReward', isActive, apiController.getReward);

router.get('/getHistory', isActive, apiController.getHistory);

router.post('/getCount', isActive, apiController.getCount);

router.post('/checkTransId', isActive, apiController.checkTransId);

router.post('/refundTransId', isActive, apiController.refundTransId);

module.exports = router;