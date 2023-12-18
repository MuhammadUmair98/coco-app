const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');
const SubTask = require('./subTask.model');

const Tasks = sequelize.define('task', {
    task_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task_completion: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    task_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    task_comp_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    proj_task_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'task',
    modelName: 'task'
});

/**
 * Associations
 */
Tasks.hasMany(SubTask, {
    foreignKey: 'task_subtask_id',
    as: 'sub_task'
})
module.exports = Tasks;
