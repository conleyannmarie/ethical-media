const router = require('express').Router();
const { Category } = require('../../models');

//gets all categories
router.get('/', (req, res) => {
    Category.findAll()
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Adds a Category
router.post('/', (req, res) => {
    Category.create({
        name: req.body.name,
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;