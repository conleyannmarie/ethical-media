const User = require('./User');
const Rating = require('./Rating');
const Category = require('./Category');
const People = require('./People');

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











module.exports = { User, Rating, Category, People };