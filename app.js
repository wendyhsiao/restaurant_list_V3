// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')

// 引用、設定 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// const restaurantList = require('./restaurant.json') *mongoose取代
const mongoose = require('mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected')
})
// 載入Restaurant Model
const Restaurant = require('./models/restaurant')

// setting static files
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
  // res.render('index', { restaurant: restaurantList.results })
})

// 新增一筆 Restaurant 頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('show', { restaurant: restaurant })
  })
})

// 修改 Restaurant 頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  Restaurant.findById(req.params.restaurant_id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
})

app.post('/restaurants/:restaurant_id', (req, res) => {
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

app.get('/search', (req, res) => {
  // console.log('req.query', req.query)
  const keyword = req.query.keyword
  // const restaurant = restaurantList.results.filter(restaurant 
  const restaurant = restaurant.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})