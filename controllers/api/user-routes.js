const router = require('express').Router();
const { User, Rating, Category } = require('../../models');
const bcrypt = require('bcrypt')

//returns all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get User by id 
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes:
        //[
            { exclude: ['password'] },
        //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'overall_rating']
        // ],

        include: [
            {
                model: Category,
                attributes: ['name'],
                include: {
                    model: Rating,
                    attributes: ['rating']
                }
                // include avatar here & possibly a user-bio

            }
        ]

    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        
            var total_rating = 0
            for(var i = 0; i<dbUserData.categories.length;i++){
               total_rating +=dbUserData.categories[i].ratings[0].rating
            }
            var average_rating = total_rating/dbUserData.categories.length
            console.log(average_rating)
      
        res.json(dbUserData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//Adds a User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        overall: req.body.overall
    })

        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with username!' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

//Logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;