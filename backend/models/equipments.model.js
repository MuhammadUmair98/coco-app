const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');

const Equipments = sequelize.define('equipment', {
    equip_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equip_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equip_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equip_owned_leased: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equip_move_in: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    equip_move_out: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    equip_desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    equip_serial_num: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'equipment',
    modelName: 'equipment'
});

module.exports = Equipments;
