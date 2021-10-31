const router = require('express').Router();
const { Category, User } = require('../../models');

//gets all categories
router.get('/', (req, res) => {
    Category.findAll({
        attributes:
            [
                'id',
                'name',
                'user_id'
            ],
        include: [
            {
                model: User,
                attributes: [
                    'username'
                ]
            }
        ]
    })
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
        user_id: req.body.user_id
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;