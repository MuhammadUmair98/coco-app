
const models = require('../models/index');
const { parse } = require('../helpers/index');
const awsConfig = require('../config/aws.config');

async function getAll() {
    return parse(await models.projectsModel.findAll({
        include: {
            model: models.projectEquipments,
            as: 'project_equipments',
            required: false,
            include: [
                {
                    model: models.equipments,
                    as: 'equipment',
                    required: false
                }
            ]
        }
    }));
}

async function add(data) {
    return await models.projectsModel.create(data);
}

async function update(id, data) {
    return models.projectsModel.update(data, { where: { proj_id: parseInt(id) } });
}

async function findOne(projectId) {
    return parse(await models.projectsModel.findOne({
        where: { proj_id: projectId },
        include: [
            {
            model: models.projectEquipments,
            as: 'project_equipments',
            required: false,
            include: [
                {
                    model: models.equipments,
                    as: 'equipment',
                    required: false
                }
            ]
        },
        {
            model: models.filesModel,
            as: 'project_files',
            required: false
        },
    ]
    }));
}

async function deleteProject(id) { }

async function addProjectEquipments(equipments) {
    return models.projectEquipments.bulkCreate(equipments);
}

async function updateProjectEquipments(projId, equipments) {
    await models.projectEquipments.destroy({ where: { proj_id: parseInt(projId) } });
    return models.projectEquipments.bulkCreate(equipments);
}

async function addTask(data) {
    return models.tasksModel.create(data);
}

async function addSubTask(data) {
    return models.subTask.create(data);
}

async function projectTaskWithSubTask(projectId) {
    const projectTasksWithSubTask = parse(await models.tasksModel.findAll({
        where: {
            proj_task_id: projectId
        },
        include: [
            {
                model: models.subTask,
                as: 'sub_task'
            }
        ]
    }));
    return projectTasksWithSubTask;
}

async function addFiles(identifier, id, url) {

    const data = {
        file_url: url
    };
    if (identifier == 'project') {
        data.project_id = parseInt(id);
    }
    else if (identifier == 'task') {
        data.task_id = parseInt(id);
    }
    else {
        data.subtask_id = parseInt(id);
    }
    await models.filesModel.create(data);
}

async function getTaskFiles(taskId) {
    const result = parse(await models.filesModel.findAll({
        where: {
            task_id : taskId
        }
    }));
    return result;
}

async function getSubTaskFiles(subTaskId) {
    const result = parse(await models.filesModel.findAll({
        where: {
            subtask_id: subTaskId
        }
    }));
    return result;
}

async function deleteFile(id){
    return models.filesModel.destroy({where : {id}})
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
    deleteFile
}