const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.get);
router.post('/', projectsController.add);
router.put('/', projectsController.update);
router.get('/project-tasks-sub-tasks/:projectId',projectsController.projectsWithTaskAndSubtasks);
/**
 * Task
 */
router.post('/tasks', projectsController.addTask);
/**
 * SubTasks
 */
router.post('/sub-tasks', projectsController.addSubTask);
module.exports = router;
