const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity
      });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.updatedAt = new Date();

    await cart.save();

    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }

    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.updatedAt = new Date();

    await cart.save();

    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ error: 'Invalid product ID or quantity' });
    }

    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not in cart' });
    }

    item.quantity = quantity;

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.updatedAt = new Date();

    await cart.save();

    res.json({ message: 'Cart item updated', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;
    cart.updatedAt = new Date();

    await cart.save();

    res.json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
