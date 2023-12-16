const express = require('express');
const router = express.Router();
const userRoute = require('./users');
const roleRoute = require('./role');

router.use('/users', userRoute);
router.use('/roles', roleRoute);

module.exports = router;
