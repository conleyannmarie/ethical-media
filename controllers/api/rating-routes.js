const router = require('express').Router();
<<<<<<< HEAD
const { Rating, User, Category } = require('../../models');
=======
const { Rating, User } = require('../../models');
>>>>>>> 96d3c85ef9f677c557c6486c2f5478c2ade2fcaa

//gets all Ratings
router.get('/', (req, res) => {
    Rating.findAll({

<<<<<<< HEAD
        attributes: ['rated_by', 'rating_for', 'rating', 'about_rating'],
        include: [{
            model: Category,
            attributes: ['name']
        },
        {
            model: User,
            attributes: ['username']
        }]
=======
        attributes: [
            'rated_by',
            'rated_for',
            'rating',
            'about_rating'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
>>>>>>> 96d3c85ef9f677c557c6486c2f5478c2ade2fcaa
    })
        .then(dbRatingData => res.json(dbRatingData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Adds a Rating
router.post('/', (req, res) => {
    Rating.create({
        //change rated_by to session user
        rated_by: req.body.rated_by,
        rating_for: req.body.rating_for,
        rating: req.body.rating,
        about_rating: req.body.about_rating
    })
        .then(dbRatingData => res.json(dbRatingData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;