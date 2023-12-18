const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/db.connection');
const Role = require('./role.model');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps:false
});

module.exports = User;