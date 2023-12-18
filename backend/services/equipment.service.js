const models = require('../models/index');
const { parse } = require('../helpers/index');

async function getAll() {
    return parse(await models.equipments.findAll());
}

async function add(data) {
    return parse(await models.equipments.create(data));
}

module.exports = {
    getAll,
    add
}