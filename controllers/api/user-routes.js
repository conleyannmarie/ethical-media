const router = require('express').Router();
const { User, Rating, Category } = require('../../models');
const bcrypt = require('bcrypt')

//returns all users
router.get('/', (req, res) => {
    User.findAll({
        attributes:
            { exclude: ['password'] },
        include: [
            {
                model: Category,
                attributes: ['name'],
                include: {
                    model: Rating,
                    attributes: ['rating', 'about_rating']
                }
                // include avatar here & possibly a user-bio
            }
        ]

    })
        .then(async dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No users found' });
                return;
            }


            for (var i = 0; i < dbUserData.length; i++) {
                var total_rating = 0
                for (var j = 0; j < dbUserData[i].categories.length; j++) {
                    total_rating += dbUserData[i].categories[j].ratings[0].rating
                }
                var average_rating = total_rating / dbUserData[i].categories.length
                console.log(average_rating)

                // await User.update({overall: average_rating},{where: {
                // id: dbUserData[i].id
                //  }})
                dbUserData[i].overall = average_rating
                //dbUserData = await dbUserData[i].save()

            }


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
        overall: req.body.overall,
        imgUrl: `https://avatars.dicebear.com/api/personas/${req.body.username}.svg`
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



// //create avatar
// router.post('/', (req, res) => {
//     let username = req.body.username;

//     let avatar = `https://avatars.dicebear.com/api/:personas/${username}.svg?background=%230000ff`
//     return res.json(avatar)
// })




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

//Get User by id 
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes:
            { exclude: ['password'] },
        include: [
            {
                model: Category,
                attributes: ['name'],
                include: {
                    model: Rating,
                    attributes: ['rating', 'about_rating']
                }
                // include avatar here & possibly a user-bio
            }
        ]

    })
        .then(async dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }

            var total_rating = 0
            if (!dbUserData.categories.length) {
                var average_rating = 0
            } else {
                for (var i = 0; i < dbUserData.categories.length; i++) {
                    total_rating += dbUserData.categories[i].ratings[0].rating
                }
                var average_rating = total_rating / dbUserData.categories.length
                console.log(average_rating)
                dbUserData.overall = average_rating
                // dbUserData = await dbUserData.save()
            }
            // User.update({overall: average_rating},{where: {
            //     id: req.params.id
            // }})
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