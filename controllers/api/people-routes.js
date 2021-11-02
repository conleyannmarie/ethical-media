const router = require('express').Router();
const { People } = require('../../models');

//gets all People
router.get('/', (req, res) => {
    People.findAll()
        .then(dbPeopleData => res.json(dbPeopleData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Adds a Person
router.post('/', (req, res) => {
    People.create({
        name: req.body.name,
        category_id: req.body.category_id
    })
        .then(dbPeopleData => res.json(dbPeopleData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;