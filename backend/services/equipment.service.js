const models = require('../models/index');
const { parse } = require('../helpers/index');

async function getAll() {
    return parse(await models.equipments.findAll());
}

async function add(data) {
    return parse(await models.equipments.create(data));
}

async function getOne(id) {
    return parse(await models.equipments.findOne({ where: { equip_id: id } }));
}

async function updateEquipment(id,data){
    return models.equipments.update(data, {
        where: { equip_id: parseInt(id) },
      });
}

module.exports = {
    getAll,
    add,
    updateEquipment,
    getOne
}