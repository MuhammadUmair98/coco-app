const models = require('../models');
const { parse } = require('../helpers/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function findUser(where) {
    return parse(await models.userModel.findOne({ where: where, include: { model: models.roleModels, as: 'role' } }));
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

function decryptPassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}

function authenticateUser(payload) {
    const token = jwt.sign(payload, 'cocoapp!@#', { expiresIn: '1d' });
    return token;
}

async function createUser(data) {
    return models.userModel.create(data);
}

module.exports = {
    findUser,
    encryptPassword,
    decryptPassword,
    authenticateUser,
    createUser
}