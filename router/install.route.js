const express = require('express');
const { isInstalled } = require('../middleware/system.middleware');
const installController = require('../controllers/install.controller');
const router = express.Router();

router.route('/').get(isInstalled, installController.index).post(installController.createSetting);

router.get('/:TOKEN_SETUP', isInstalled, installController.setupToken);

router.get('/reset/:TOKEN_SETUP', installController.reset);

module.exports = router;