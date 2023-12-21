const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');

const Equipments = sequelize.define('files', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    task_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    subtask_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'files',
    modelName: 'files'
});

module.exports = Equipments;
