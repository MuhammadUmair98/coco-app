const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');

const SubTask = sequelize.define('subTask', {
    subtask_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subtask_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtask_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    subtask_comp_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    subtask_completion: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    task_subtask_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'subtask',
    modelName: 'subtask'
});

module.exports = SubTask;
