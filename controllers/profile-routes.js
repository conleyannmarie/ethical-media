const router = require("express").Router();
const { Rating, User, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: [{ exclude: ["password"] }],
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
        dbUserData = await dbUserData.save();
      }

      const user = dbUserData.get({ plain: true });

      res.render("profile", {
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

module.exports = router;
