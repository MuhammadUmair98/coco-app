const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false , tableName : 'role' , modelName : 'role' });

module.exports = Role;