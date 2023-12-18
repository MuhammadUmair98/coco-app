const express = require('express');
const router = express.Router();
const userRoute = require('./users');
const roleRoute = require('./role');
const projectRoute = require('./projects');
const equipmentRoute = require('./equipments');

router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/projects', projectRoute);
router.use('/equipments', equipmentRoute);

module.exports = router;
