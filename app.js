// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
if (process.env.NODE_ENV !== 'production') {  // 如果不是 production 模式
  require('dotenv').config()                  // 使用 dotenv 讀取 .env 檔案
}
const exphbs = require('express-handlebars')  // require express-handlebars here
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// 引用、設定 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// const restaurantList = require('./restaurant.json') *mongoose取代
const mongoose = require('mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })

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

// 使用 express session 
app.use(session({
  secret: 'your secret key',                // secret: 定義一組自己的私鑰（字串)
  resave: 'false',
  saveUninitialized: 'false'
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

app.use(flash())

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用

  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})



app.get('/search', (req, res) => {
  console.log('req.query', req.query)
  const keyword = req.query.keyword
  // const restaurant = restaurantList.results.filter(restaurant 
  const restaurant = Restaurant.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

// 載入路由器
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})