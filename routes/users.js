const express = require('express');
const router = express.Router();

const usersController=require('../controllers/users')

router.post('/register', usersController.postRegister);
router.post('/login', usersController.postLogin);
router.post('/addUserAddress', usersController.postUserAddress)
module.exports = router;
