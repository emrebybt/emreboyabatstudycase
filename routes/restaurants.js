const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurants')

router.post('/addRestaurant', restaurantController.postRestaurant);
router.post('/addRestaurantAddress', restaurantController.postRestaurantAddress);
router.get('/findRestaurantByLocation', restaurantController.getRestaurantByLocation);
router.get('/findRestaurantByTypeAndRating', restaurantController.getRestaurantByTypeAndRating);
router.post('/createMenu', restaurantController.postCreateMenu);
router.post('/addMenu', restaurantController.postAddMenu);
router.get('/restaurantList', restaurantController.getRestaurantList)

module.exports = router;
