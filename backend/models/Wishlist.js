const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: String,
      price: Number,
      img: String,
      brand: String,
      rating: Number,
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
