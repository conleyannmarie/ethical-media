const { Model, DataTypes } = require('sequelize')
const { model } = require('../config/connection')
const sequelize = require('../config/connection')

class Rating extends Model { }

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },
        rated_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        // I belive it is referencing a parent table while this isn't mentioned in said table...?
        rating_for: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'category',
                key: 'id'
            }

        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10
            }

        },
        about_rating: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'rating'
    }

);

module.exports = Rating;