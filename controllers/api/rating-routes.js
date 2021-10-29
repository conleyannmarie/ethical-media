const router = require('express').Router();
const { Rating } = require('../../models');

//gets all Ratings
router.get('/', (req, res) => {
    Rating.findAll()
        .then(dbRatingData => res.json(dbRatingData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Adds a Rating
router.post('/', (req, res) => {
    Rating.create({
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