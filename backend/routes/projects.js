const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

router.get('/', projectsController.getAll);
router.post('/', projectsController.add);
router.put('/', projectsController.update);
module.exports = router;
