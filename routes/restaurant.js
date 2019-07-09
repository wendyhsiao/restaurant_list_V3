const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
// 設定 /restaurant 路由
// 新增一筆 Restaurant 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
  })

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 顯示一筆 Restaurant 的詳細內容
router.get('/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 修改 Restaurant 頁面
router.get('/:restaurant_id/edit', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

router.put('/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.restaurant_id}`)
    })
  })
})

// 刪除 Restaurant
router.delete('/:restaurant_id/delete', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router