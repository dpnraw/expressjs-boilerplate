const express = require('express')
const path = require('path')
const blogs = require('../data/blog')
const router = express.Router()

// islogged in middleware
const isLoggedIn = require("../middlewares/isLoggedIn")

router.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, "../templates/index.html"))
    res.render('home')
})

router.get('/blogs', isLoggedIn, (req, res)=> {
    res.json({blogs});
})

module.exports = router