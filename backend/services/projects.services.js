const models = require("../models/index");
const { parse } = require("../helpers/index");
const awsConfig = require("../config/aws.config");

async function getAll() {
  return parse(
    await models.projectsModel.findAll({
      include: {
        model: models.projectEquipments,
        as: "project_equipments",
        required: false,
        include: [
          {
            model: models.equipments,
            as: "equipment",
            required: true,
          },
        ],
      },
    })
  );
}

async function add(data) {
  return await models.projectsModel.create(data);
}

async function update(id, data) {
  return models.projectsModel.update(data, {
    where: { proj_id: parseInt(id) },
  });
}

async function findOne(projectId) {
  return parse(
    await models.projectsModel.findOne({
      where: { proj_id: projectId },
      include: [
        {
          model: models.projectEquipments,
          as: "project_equipments",
          required: false,
          include: [
            {
              model: models.equipments,
              as: "equipment",
              required: true,
            },
          ],
        },
        {
          model: models.filesModel,
          as: "project_files",
          required: false,
        },
      ],
    })
  );
}

async function deleteProject(proj_id) {
  return models.projectsModel.destroy({ where: { proj_id } });
}

async function addProjectEquipments(equipments) {
  return models.projectEquipments.bulkCreate(equipments);
}

async function updateProjectEquipments(projId, equipments) {
  await models.projectEquipments.destroy({
    where: { proj_id: parseInt(projId) },
  });
  return models.projectEquipments.bulkCreate(equipments);
}

async function addTask(data) {
  return models.tasksModel.create(data);
}

async function addSubTask(data) {
  return models.subTask.create(data);
}

async function projectTaskWithSubTask(projectId) {
  const projectTasksWithSubTask = parse(
    await models.tasksModel.findAll({
      where: {
        proj_task_id: projectId,
      },
      include: [
        {
          model: models.subTask,
          as: "sub_task",
        },
      ],
    })
  );
  // Map through the array and update completion values
  const updatedTasks = projectTasksWithSubTask.map((task) => {
    // Update task_completion if needed
    if (task.task_completion === 1) {
      task.task_completion = true;
    }

    // Update subtask_completion if subtasks exist
    if (task.sub_task && task.sub_task.length > 0) {
      task.sub_task = task.sub_task.map((subtask) => {
        if (subtask.subtask_completion === 1) {
          subtask.subtask_completion = true;
        }
        return subtask;
      });
    }

    return task;
  });

  // Now, updatedTasks contains the modified completion values
  const parsedTasks = parse(updatedTasks);
  return parsedTasks;
}

async function addFiles(identifier, id, url) {
  const data = {
    file_url: url,
  };
  if (identifier == "project") {
    data.project_id = parseInt(id);
  } else if (identifier == "task") {
    data.task_id = parseInt(id);
  } else {
    data.subtask_id = parseInt(id);
  }
  await models.filesModel.create(data);
}

async function getTaskFiles(taskId) {
  const result = parse(
    await models.filesModel.findAll({
      where: {
        task_id: taskId,
      },
    })
  );
  return result;
}

async function getSubTaskFiles(subTaskId) {
  const result = parse(
    await models.filesModel.findAll({
      where: {
        subtask_id: subTaskId,
      },
    })
  );
  return result;
}

async function deleteFile(id) {
  return models.filesModel.destroy({ where: { id } });
}

async function deleteSubTasks(id){
    return models.subTask.destroy({ where : { subtask_id : id } });
}

async function deleteTask(id){
    return models.tasksModel.destroy({ where : { task_id : id } });
}

module.exports = {
  getAll,
  add,
  update,
  findOne,
  deleteProject,
  addProjectEquipments,
  updateProjectEquipments,
  addTask,
  addSubTask,
  projectTaskWithSubTask,
  addFiles,
  getTaskFiles,
  getSubTaskFiles,
  deleteFile,
  deleteSubTasks,
  deleteTask
};
