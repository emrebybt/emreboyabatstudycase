const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");

router.post('/addOrder', orderController.postCreateOrder);

module.exports = router;
