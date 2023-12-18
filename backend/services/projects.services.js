
const models = require('../models/index');
const { parse } = require('../helpers/index');

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
    projectTaskWithSubTask
}