const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects.controller");
const multer = require("multer");
const upload = multer();

router.get("/download/:fileKey", projectsController.getFile);
router.get("/", projectsController.getAll);
router.get("/:id", projectsController.get);
router.post("/", projectsController.add);
router.put("/", projectsController.update);
router.post("/files", upload.single("file"), projectsController.addFile);
router.get(
  "/project-tasks-sub-tasks/:projectId",
  projectsController.projectsWithTaskAndSubtasks
);
/**
 * Task
 */
router.post("/tasks", projectsController.addTask);
router.post("/task-subtask-files", projectsController.getTaskSubTaskFiles);
router.put("/task-status", projectsController.isTaskCompleted);
/**
 * SubTasks
 */
router.post("/sub-tasks", projectsController.addSubTask);
router.put("/sub-task-status", projectsController.isSubTaskCompleted);

/**
 * Delete Files Routes
 */
router.delete("/delete-file/:fileId", projectsController.deleteFile);

/**
 * Delete Files Routes
 */
router.delete("/delete-project/:proj_id", projectsController.deleteProject);

module.exports = router;
