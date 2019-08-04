const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurant = require('../../restaurant.json').results
const User = require('../user')
const user = require('../../user.json')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  user.forEach(user => {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser.save().then(users => {
          for (let j = user.restaurant[0] - 1; j < user.restaurant[2]; j++) {
            Restaurant.create({
              name: restaurant[j].name,
              name_en: restaurant[j].name_en,
              category: restaurant[j].category,
              image: restaurant[j].image,
              location: restaurant[j].location,
              phone: restaurant[j].phone,
              google_map: restaurant[j].google_map,
              rating: restaurant[j].rating,
              description: restaurant[j].description,
              userId: users._id
            })
          }
        }).catch(err => {
          console.log(err)
        })
      })
    })
  })

  console.log('done')
})



// user.forEach((user) => {
//   console.log(user)
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(user.password, salt, (hash) => {
//       if (err) throw err
//       user.password = hash

//       User.create({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//       }).then(users => {

//         for (let i = 0; i < 3; i++) {
//           Restaurant.create({
//             name: restaurant[i].name,
//             name_en: restaurant[i].name_en,
//             category: restaurant[i].category,
//             image: restaurant[i].image,
//             location: restaurant[i].location,
//             phone: restaurant[i].phone,
//             google_map: restaurant[i].google_map,
//             rating: restaurant[i].rating,
//             description: restaurant[i].description,
//             userId: users._id
//           })
//         }
//       })

//     })
//   })
// })
