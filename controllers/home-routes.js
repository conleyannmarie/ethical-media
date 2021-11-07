const router = require("express").Router();
const { Rating, User, Category } = require("../models");
const Sequelize = require("sequelize");

//returns all users
router.get("/", (req, res) => {
  User.findAll({
    // attributes: { exclude: ["password"] },
    attributes: [
      //   { exclude: ["password"] },
      "id",
      "username",
      "imgUrl",
      // [
      //   Sequelize.fn("avg", Sequelize.col("categories.ratings.rating")),
      //   "overall",
      // ],
    ],
    include: [
      {
        model: Category,
        attributes: ["name"],
        include: {
          model: Rating,
          attributes: ["rating", "about_rating"],
        },
        // include avatar here & possibly a user-bio
      },
    ],
  })
    .then(async (dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No users found" });
        return;
      }

      for (var i = 0; i < dbUserData.length; i++) {
        var total_rating = 0;
        for (var j = 0; j < dbUserData[i].categories.length; j++) {
          total_rating += dbUserData[i].categories[j].ratings[0].rating;
        }

        if (dbUserData[i].categories.length == 0) {
          var average_rating = 0;
        } else {
          var average_rating = total_rating / dbUserData[i].categories.length;
        }
        console.log(average_rating);

        await User.update(
          { overall: average_rating },
          {
            where: {
              id: dbUserData[i].id,
            },
          }
        );
        dbUserData[i].overall = average_rating;
        // dbUserData = await dbUserData[i].save()
      }

      const users = dbUserData.map((user) => user.get({ plain: true }));

      res.render("homepage", {
        users,
        loggedIn: req.session.loggedIn,
      });
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/user/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      //   { exclude: ["password"] },
      "id",
      "username",
      "imgUrl",
      // [
      //   Sequelize.fn("AVG", Sequelize.col("categories.ratings.rating")),
      //   "overall",
      // ],
    ],
    // attributes:
    //     { exclude: ['password'] },
    include: [
      {
        model: Category,
        attributes: ["name"],
        include: {
          model: Rating,
          attributes: ["rating", "about_rating"],
        },
        // include avatar here & possibly a user-bio
      },
    ],
  })
    .then(async (dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }

      var total_rating = 0;
      if (!dbUserData.categories.length) {
        var average_rating = 0;
      } else {
        for (var i = 0; i < dbUserData.categories.length; i++) {
          total_rating += dbUserData.categories[i].ratings[0].rating;
        }
        var average_rating = total_rating / dbUserData.categories.length;
        console.log(average_rating);
        dbUserData.overall = average_rating;
        // dbUserData = await dbUserData.save()
      }

      const user = dbUserData.get({ plain: true });

      res.render("single-user", {
        user,
        loggedIn: req.session.loggedIn,
      });
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// //create avatar
// router.post('/', (req, res) => {
//     let { username } = req.body.username;

//     let avatar = `https://avatars.dicebear.com/api/:personas/${username}.svg?background=%230000ff`
//     return res.json({ avatar })
// })

module.exports = router;
