const equipmentServices = require('../services/equipment.service');

async function getAll(req, res, next) {
    try {
        const equipments = await equipmentServices.getAll();
        res.status(200).json({ message: 'success', data: equipments });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function add(req, res, next) {
    try {
        const data = req.body;
        const equipment = await equipmentServices.add(data);
        res.status(200).json({ message: 'success', data: equipment });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    getAll,
    add
}