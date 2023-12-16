const models = require('../models/index');
const { parse } = require('../helpers/index');

async function getAllRole() {
    return parse(await models.roleModels.findAll());
}

module.exports = {
    getAllRole
}