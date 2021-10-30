const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');
const People = require('./People');

// // People.hasMany(Rating, {
// //     foreignKey: ''
// // })

// Category.belongsTo(Rating, {
//     foreignKey: 'rating_id'
// })

// Category.hasMany(Rating, {
//     foreignKey: 'category_id'
// })

// Category.belongsTo(People, {
//     foreignKey: 'people_id'
// })

// People.hasMany(Category, {
//     foreignKey: 'people_id'
// })


// Rating.belongsTo(User, {
//     foreignKey: 'user_id'
// })

// User.hasMany(Rating, {
//     foreignKey: 'user_id'
// })


module.exports = {User, Category, People, Rating };