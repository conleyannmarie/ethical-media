const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const categoryRoutes = require('./category-routes.js');
const ratingRoutes = require('./rating-routes.js')


router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/ratings', ratingRoutes)


module.exports = router;