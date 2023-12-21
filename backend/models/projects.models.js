const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');
const ProjectEquipments = require('./projectEquipments');
const TasksModel = require('./tasks.model');
const FilesModel = require('./files.model');

const Projects = sequelize.define('project', {
    proj_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    proj_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proj_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proj_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    proj_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    proj_completion_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    proj_completion_percentage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    proj_bucket_identifier: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'project',
    modelName: 'project'
});

/**
 * Associatons
 */
Projects.hasMany(ProjectEquipments, {
    foreignKey: 'proj_id',
    as: 'project_equipments'
});
Projects.hasMany(TasksModel,{
    foreignKey : 'proj_task_id',
    as : 'project_tasks'
});
Projects.hasMany(FilesModel,{
    foreignKey : 'project_id',
    as : 'project_files'
});

module.exports = Projects;