const { Model, DataTypes } = require('sequelize')
const { model } = require('../config/connection')
const sequelize = require('../config/connection')

class People extends Model {}

Category.init(
{
    id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'category'
        }
        
    );

model.exports = Category;