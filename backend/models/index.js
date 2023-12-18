const userModel = require('./user.model');
const roleModels = require('./role.model');
const projectsModel = require('./projects.models');
const equipments = require('./equipments.model');
const projectEquipments = require('./projectEquipments');
const tasksModel = require('./tasks.model');
const subTask = require('./subTask.model');

module.exports = {
    userModel,
    roleModels,
    projectsModel,
    equipments,
    projectEquipments,
    tasksModel,
    subTask
}