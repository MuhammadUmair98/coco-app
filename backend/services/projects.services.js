
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
                    required : false
                }
            ]
        }
    }));
}

async function add(data) {
    return await models.projectsModel.create(data);
}

async function update(id, data) {
    return models.projectsModel.update(data, { where: { proj_id: id } });
}

async function findOne(id) { }

async function deleteProject(id) { }

async function addProjectEquipments(equipments) {
    return models.projectEquipments.bulkCreate(equipments);
}

async function updateProjectEquipments(projId, equipments) {
    await models.projectEquipments.destroy({ where: { proj_id: projId } });
    return models.projectEquipments.bulkCreate(equipments);
}

module.exports = {
    getAll,
    add,
    update,
    findOne,
    deleteProject,
    addProjectEquipments,
    updateProjectEquipments
}