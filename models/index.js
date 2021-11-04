const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');


Category.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Category, {
    foreignKey: 'user_id'
})

User.hasMany(Rating, {
    foreignKey: 'rated_by'
})

Rating.belongsTo(User, {
    foreignKey: 'rated_by'
});

Rating.belongsTo(Category, {
    foreignKey: 'rating_for'
})

Category.hasMany(Rating, {
    foreignKey: 'rating_for'
})



module.exports = { User, Category, Rating };