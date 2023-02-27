//  this is a rotuing file for restaurants 
const express = require('express')
const router = express.Router()
const restaurantModel = require('../models/restaurants')

// is loggedIn middleware
const isLoggedIn = require('../middlewares/isLoggedIn')


router.get('/', isLoggedIn, async (req, res)=>{

    const result = await restaurantModel.find()

    res.json({restaurants: result})
})
module.exports = router