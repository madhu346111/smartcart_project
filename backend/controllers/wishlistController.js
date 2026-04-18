const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, items: [] });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.userId, items: [] });
    }

    const existingItem = wishlist.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    wishlist.items.push({
      productId,
      name: product.name,
      price: product.price,
      img: product.img,
      brand: product.brand,
      rating: product.rating,
      addedAt: new Date()
    });

    wishlist.updatedAt = new Date();
    await wishlist.save();

    res.json({ message: 'Item added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.userId });
    
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    wishlist.updatedAt = new Date();

    await wishlist.save();

    res.json({ message: 'Item removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.userId });
    
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    wishlist.items = [];
    wishlist.updatedAt = new Date();

    await wishlist.save();

    res.json({ message: 'Wishlist cleared', wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
