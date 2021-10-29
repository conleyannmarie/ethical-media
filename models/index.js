const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');
const People = require('./People');

People.hasMany(Rating, {
    foreignKey: ''
})

People.hasMany(Category, {
    foreignKey: ''
})




module.exports = { User };