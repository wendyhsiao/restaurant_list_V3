const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  name_en: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  google_map: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  // 加入 userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  //定義這個屬性是從 User 這個 model 裡取得
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)