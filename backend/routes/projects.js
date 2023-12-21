const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
const multer  = require('multer')
const upload = multer();

router.get('/download/:fileKey', projectsController.getFile);
router.get('/', projectsController.getAll);
router.get('/:id', projectsController.get);
router.post('/', projectsController.add);
router.put('/', projectsController.update);
router.post('/files', upload.single("file"),projectsController.addFile);
router.get('/project-tasks-sub-tasks/:projectId',projectsController.projectsWithTaskAndSubtasks);
/**
 * Task
 */
router.post('/tasks', projectsController.addTask);
router.post('/task-subtask-files', projectsController.getTaskSubTaskFiles);
/**
 * SubTasks
 */
router.post('/sub-tasks', projectsController.addSubTask);
module.exports = router;
