const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const categoryRoutes = require('./category-routes.js');
const peopleRoutes = require('./people-routes.js')
const ratingRoutes = require('./rating-routes.js')


router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/people', peopleRoutes)
router.use('/ratings', ratingRoutes)


module.exports = router;