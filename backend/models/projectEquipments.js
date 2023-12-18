const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');
const Equipments = require('./equipments.model');

const ProjectEquipments = sequelize.define('equipment_project', {
    equip_proj_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    proj_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    equip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: false, tableName: 'equipment_project', modelName: 'equipment_project' });

/**
 * Associations
 */

ProjectEquipments.belongsTo(Equipments, {
    foreignKey: 'equip_id',
    as: 'equipment'
});
module.exports = ProjectEquipments;
