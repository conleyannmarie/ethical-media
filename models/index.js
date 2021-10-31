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
<<<<<<< HEAD
});
=======
})
>>>>>>> 96d3c85ef9f677c557c6486c2f5478c2ade2fcaa

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
Rating.belongsTo(Category, {
    foreignKey: 'rating_for'
})

Category.hasMany(Rating, {
    foreignKey: 'rating_for'
>>>>>>> 96d3c85ef9f677c557c6486c2f5478c2ade2fcaa
})



<<<<<<< HEAD


=======
>>>>>>> 96d3c85ef9f677c557c6486c2f5478c2ade2fcaa
module.exports = { User, Category, Rating };