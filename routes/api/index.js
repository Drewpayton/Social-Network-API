const router = require('express').Router()
const userRoutes = require('./user');
const thoughtRoutes = require('./thought');


router.route('/users', userRoutes);
router.route('/thoughts', thoughtRoutes);
