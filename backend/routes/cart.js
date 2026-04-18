const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/update', updateCartItem);
router.post('/clear', clearCart);

module.exports = router;
