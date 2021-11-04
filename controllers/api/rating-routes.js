const router = require('express').Router();
const { Rating, User, Category } = require('../../models');

//gets all Ratings
router.get('/', (req, res) => {
    Rating.findAll({

        attributes: [
            'rated_by',
            'rating_for',
            'rating',
            'about_rating'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['name']
            },

        ]
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