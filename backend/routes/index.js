const express = require('express');
const router = express.Router();
require('../config/passport'); // Ініціалізація passport

router.use('/auth', require('./auth.routes'));
router.use('/users', require('./user.routes'));
router.use('/subscribers', require('./subscriber.routes'));
router.use('/contacts', require('./contact.routes'));
router.use('/admin', require('./admin.routes'));

module.exports = router;
