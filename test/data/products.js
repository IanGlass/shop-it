const mongoose = require('mongoose');

module.exports = {
  products: [
    {
      "_id": mongoose.Types.ObjectId(1),
      "title": "Mazda 3",
      "price": 23695,
      "description": 'Mazda2 GLX Hatch',
      "imageUrl": 'data/images/mazda3.jpg',
      "user": mongoose.Types.ObjectId(100),
    },
    {
      "_id": mongoose.Types.ObjectId(2),
      "title": "Toyota Rav4",
      "price": 34990,
      "description": 'Available in front- or all-wheel drive and with a choice of petrol or diesel engines, the RAV4 is a handsome and capable player in the urban SUV segment.',
      "imageUrl": 'data/images/rav4.jpg',
      "user": mongoose.Types.ObjectId(200),
    },
  ]
}