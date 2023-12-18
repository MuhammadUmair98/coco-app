const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipment.controller');

router.get('/', equipmentController.getAll);
router.post('/', equipmentController.add);
module.exports = router;
