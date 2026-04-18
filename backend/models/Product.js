const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Furnitures', 'Books', 'Fashion', 'Beauty', 'Toys']
  },
  brand: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
