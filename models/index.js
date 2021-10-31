const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');


Category.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Category, {
    foreignKey: 'user_id'
})

<<<<<<< HEAD
User.hasMany(Rating, {
    foreignKey: 'rated_by'
});
=======
// Category.hasOne(Rating, {
//     foreignKey: 'rating_for'
// })
>>>>>>> be182ca6ad7081c6d983a6b020c49632247321ff

Rating.belongsTo(User, {
    foreignKey: 'rated_by'
});

<<<<<<< HEAD
Category.hasMany(Rating, {
    foreignKey: 'rating_for'
})

Rating.belongsTo(Category, {
    foreignKey: 'rating_for'
=======
Rating.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Rating, {
    foreignKey: 'user_id'
>>>>>>> be182ca6ad7081c6d983a6b020c49632247321ff
})



<<<<<<< HEAD


=======
>>>>>>> be182ca6ad7081c6d983a6b020c49632247321ff
module.exports = { User, Category, Rating };