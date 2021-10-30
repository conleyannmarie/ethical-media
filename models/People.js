const { Model, DataTypes } = require('sequelize')
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'category',
                key: 'id'
            }
        },
       
        overall_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10
            }
        }
    }, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'people'
});

module.exports = People;