const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
// 設定 /restaurant 路由
router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
  // res.render('index', { restaurant: restaurantList.results })
})

module.exports = router