const roleServices = require('../services/role.service');

async function getAllRole(req,res,next) {
    try {
        const roles = await roleServices.getAllRole();
        res.status(200).json({ message: 'success', data: roles });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    getAllRole
}