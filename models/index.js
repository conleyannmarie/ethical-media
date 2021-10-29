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

People.belongsToMany(Rating, {
    through: Category,
    as: '',
    foreignKey: ''
})

// People.belongsToMany(Category {
//     through: 
// })


module.exports = { User, Rating, Category, People };