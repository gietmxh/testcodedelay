const express = require('express');
const { loggedIn, isAdmin } = require('../middleware/auth.middleware');
const authRoute = require('../router/auth.route');
const momoModel = require('../models/momo.model');
const adminController = require('../controllers/admin.controller');
const gameController = require('../controllers/game.controller');
const rewardController = require('../controllers/reward.controller');
const playerController = require('../controllers/player.controller');
const jackpotController = require('../controllers/jackpot.controller');
const momoController = require('../controllers/momo.controller');
const historyController = require('../controllers/history.controller');
const musterController = require('../controllers/muster.controller');
const accountController = require('../controllers/account.controller');
const router = express.Router();

router.use(authRoute);

router.get(['/', '/home', '/dashboard'], loggedIn, adminController.dashboard);

router.route('/system')
    .get(loggedIn, (req, res) => res.render('admin/system', { title: 'Cài Đặt Hệ Thống' }))
    .put(isAdmin, adminController.system);

router.delete('/logSystem/:id', isAdmin, adminController.logSystem);

router.get('/revenueData', loggedIn, adminController.revenueData);

router.route('/game')
    .get(loggedIn, gameController.index)
    .post(isAdmin, gameController.add);

router.route('/game/:id')
    .put(isAdmin, gameController.update)
    .delete(isAdmin, gameController.remove);

router.route('/reward')
    .get(loggedIn, rewardController.index)
    .post(isAdmin, rewardController.add);

router.route('/reward/:id')
    .put(isAdmin, rewardController.update)
    .delete(isAdmin, rewardController.remove);

router.get('/player', loggedIn, playerController.player);
router.get('/all-player', isAdmin, playerController.all);

router.route('/block-player')
    .get(loggedIn, playerController.block)
    .post(isAdmin, playerController.addBlock);

router.route('/block-player/:id')
    .put(isAdmin, playerController.updateBlock)
    .delete(isAdmin, playerController.removeBlock);

router.get('/jackpot', loggedIn, jackpotController.player);

router.route('/history-jackpot')
    .get(loggedIn, jackpotController.history)
    .post(isAdmin, jackpotController.rework);

router.route('/jackpot/:id')
    .put(isAdmin, jackpotController.updatePlayer)
    .delete(isAdmin, jackpotController.removePlayer);

router.route('/history-jackpot/:id')
    .put(isAdmin, jackpotController.updateHistory)
    .delete(isAdmin, jackpotController.removeHistory);

router.get('/momo', loggedIn, momoController.index);

router.route('/momo/:id')
    .get(isAdmin, momoController.info)
    .put(isAdmin, momoController.update)
    .delete(isAdmin, momoController.remove);

router.put('/momo/token/:id', loggedIn, momoController.updateToken);
router.put('/momo/money/:id', loggedIn, momoController.updateMoney);

router.route('/transfer')
    .get(loggedIn, async (req, res) => {
        let phones = await momoModel.find().lean();
        res.render('admin/transfer', { title: 'Chuyển Tiền', phones });
    })
    .post(isAdmin, momoController.transfer);

router.get('/history', loggedIn, historyController.index);
router.post('/history', loggedIn, historyController.rework);

router.route('/history/:id')
    .put(isAdmin, historyController.update)
    .delete(isAdmin, historyController.remove);

router.get('/history-transfer', loggedIn, historyController.transfer);
router.delete('/history-transfer/:id', isAdmin, historyController.deleteTransfer);

router.get('/spam-tools', loggedIn, async (req, res) => {
    let phones = await momoModel.find({ loginStatus: 'active' }).lean();
    res.render('admin/spam-tools', { title: 'Spam Chuyển Tiền', phones });
})

router.route('/list-account')
    .get(loggedIn, accountController.index)
    .post(isAdmin, accountController.add);

router.route('/list-account/:id')
    .put(isAdmin, accountController.update)
    .delete(isAdmin, accountController.remove);

router.get('/muster', loggedIn, musterController.index);

router.route('/muster/:id')
    .put(isAdmin, musterController.update)
    .delete(isAdmin, musterController.remove);

module.exports = router;