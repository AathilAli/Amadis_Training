const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: "students",
        timestamps: false
    }
);

module.exports = Student;