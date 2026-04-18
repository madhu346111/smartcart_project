const express = require('express');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getWishlist);
router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.post('/clear', clearWishlist);

module.exports = router;
