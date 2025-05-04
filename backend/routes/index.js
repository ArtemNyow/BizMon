const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/subscribe', require('./subscriber.routes'));
router.use('/contact', require('./contact.routes'));
router.use('/admin', require('./admin.routes')); // ← додай це

module.exports = router;
