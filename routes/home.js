const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth.js')  // 載入 auth middleware 裡的 authenticated 方法


// 設定 /restaurant 路由
router.get('/', authenticated, (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
  // res.render('index', { restaurant: restaurantList.results })
})

module.exports = router