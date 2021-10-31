const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');


Category.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Category, {
    foreignKey: 'user_id'
})

// Category.hasOne(Rating, {
//     foreignKey: 'rating_for'
// })


Rating.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Rating, {
    foreignKey: 'user_id'
})



module.exports = { User, Category, Rating };