const express = require('express');
const apiController = require('../controllers/api.controller');
const { isAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/otp', isAdmin, apiController.otp);

router.post('/confirm', isAdmin, apiController.confirm);

router.post('/login', isAdmin, apiController.login);

router.post('/history', isAdmin, apiController.history);

router.post('/details', isAdmin, apiController.details);

router.post('/balance', isAdmin, apiController.balance);

router.post('/transfer', isAdmin, apiController.transfer);

module.exports = router;