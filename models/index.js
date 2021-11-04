const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');

<<<<<<< HEAD
<<<<<<< HEAD
// People.hasMany(Rating, {
//     foreignKey: ''
// })

Category.belongTo(Rating, {
    foreignKey: 'rating_id'
})

Category.hasMany(Rating, {
    foreignKey: 'category_id'
})

Category.belongTo(People, {
    foreignKey: 'people_id'
})

People.hasMany(Category, {
    foreignKey: 'people_id'
})


Rating.belongTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Rating, {
<<<<<<< HEAD
    foreignKey: 'rating_id'
=======
    foreignKey: 'user_id'
>>>>>>> 12c08b1ece228223023eea364ab930ab3bd53ac7
})


=======
// // People.hasMany(Rating, {
// //     foreignKey: ''
// // })
>>>>>>> b007f683953fb10b993bb03f2fd818b456e8675f
=======
>>>>>>> 50cafae41d075f6976c523f1b3f88c8233f09aab

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