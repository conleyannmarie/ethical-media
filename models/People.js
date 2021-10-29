const { Model, DataTypes } = require('sequelize')
const { model } = require('../config/connection')
const sequelize = require('../config/connection')

class People extends Model { }

People.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        overall_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10
            }
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'people'
    }

);

module.exports = People;