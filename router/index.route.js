const express = require('express');
const settingModel = require('../models/setting.model');
const gameModel = require('../models/game.model');
const historyService = require('../services/history.service');
const apiRoute = require('../router/api.route');
const { notInstalled } = require('../middleware/system.middleware');
const installRoute = require('../router/install.route');
const cronRoute = require('../router/cron.route');
const adminRoute = require('../router/admin.route');
const router = express.Router();

router.use(async (req, res, next) => {
    res.locals.PUSHER_APP_KEY = process.env.PUSHER_APP_KEY;
    res.locals.settings = await settingModel.findOne().lean();
    res.locals.originalUrl = req._parsedUrl;
    res.locals.query = new URLSearchParams(req._parsedUrl.search);
    if (req.query.page) res.locals.query.delete('page');
    res.locals.query = res.locals.query.toString();
    res.locals.baseURL = `${req.protocol}://${process.env.DOMAIN}`;
    next();
})

router.use('/install', installRoute);

router.use('/api/v1', apiRoute);

router.use('/cronJobs', cronRoute);

router.use('/adminPanel', adminRoute);

router.get('/', notInstalled, async (req, res) => {
    if (res.locals.settings.siteStatus == 'baotri') {
        return res.render('page/close', { layout: false })
    }

    let games = await gameModel.find({ display: 'show' }).lean();
    let tops = await historyService.getTOP();
    if (res.locals.settings.refund.status == 'active') res.locals.refund = true;
    if (res.locals.settings.notification.status == 'active') res.locals.notification = true;
    if (res.locals.settings.jackpot.status == 'active') res.locals.jackpot = true;

    res.render('page/home', { games, tops });
})

router.use((req, res, next) => {
    next({ status: 404, message: 'page not found!' });
})

module.exports = router;
