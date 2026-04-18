# SmartCart Backend - MongoDB Version

## 📁 Project Structure

```
shopbackend-mongodb/
├── config/
│   ├── database.js          (MongoDB connection)
│   └── seedData.js          (Initial product data)
├── models/
│   ├── User.js             (User schema)
│   ├── Product.js          (Product schema)
│   ├── Cart.js             (Shopping cart schema)
│   └── Wishlist.js         (Wishlist schema)
├── controllers/
│   ├── authController.js   (Authentication logic)
│   ├── productController.js (Product operations)
│   ├── cartController.js   (Cart operations)
│   └── wishlistController.js (Wishlist operations)
├── routes/
│   ├── auth.js             (Auth endpoints)
│   ├── products.js         (Product endpoints)
│   ├── cart.js             (Cart endpoints)
│   └── wishlist.js         (Wishlist endpoints)
├── middleware/
│   └── authMiddleware.js   (JWT authentication)
├── .env                    (Environment variables)
├── server.js               (Main server file)
├── package.json            (Dependencies)
└── README.md              (This file)
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Step 1: Install Node.js
Download from: https://nodejs.org/ (LTS recommended)

### Step 2: Install MongoDB

#### Option A: Local MongoDB
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: https://docs.mongodb.com/manual/administration/install-on-linux/
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Replace MONGODB_URI in `.env`

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd shopbackend-mongodb

# Install dependencies
npm install

# Update .env file if using MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcart

# Start server
npm start
```

### Step 4: Connect Frontend

In `shopfrontend/index.html`, change the script tag:

```html
<!-- From: -->
<script src="script.js"></script>

<!-- To: -->
<script src="script-mongodb.js"></script>
```

Then open `index.html` in your browser.

## 📡 API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}

Response: { token, user: { id, username } }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}

Response: { token, user: { id, username } }
```

#### Verify Token
```
GET /api/auth/verify
Authorization: Bearer {token}

Response: { valid: true, user: { id, username } }
```

### Products

#### Get All Products (with filters)
```
GET /api/products?category=Electronics&search=phone&minPrice=10000&maxPrice=50000&rating=4

Response: [{ id, name, price, brand, category, img, rating, ... }]
```

#### Get Single Product
```
GET /api/products/{id}

Response: { id, name, price, ... }
```

#### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 5000,
  "category": "Electronics",
  "brand": "Brand Name",
  "img": "image-url",
  "rating": 4,
  "stock": 100
}
```

#### Update Product
```
PUT /api/products/{id}
Content-Type: application/json

{ "price": 4500, "stock": 50 }
```

#### Delete Product
```
DELETE /api/products/{id}
```

#### Get Categories
```
GET /api/products/categories

Response: ["Electronics", "Fashion", "Books", ...]
```

### Cart (Requires Authentication)

#### Get Cart
```
GET /api/cart
Authorization: Bearer {token}

Response: { userId, items: [...], totalPrice }
```

#### Add to Cart
```
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "mongo-id",
  "quantity": 1
}
```

#### Remove from Cart
```
POST /api/cart/remove
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "mongo-id"
}
```

#### Update Cart Item
```
POST /api/cart/update
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "mongo-id",
  "quantity": 2
}
```

#### Clear Cart
```
POST /api/cart/clear
Authorization: Bearer {token}
```

### Wishlist (Requires Authentication)

#### Get Wishlist
```
GET /api/wishlist
Authorization: Bearer {token}

Response: { userId, items: [...] }
```

#### Add to Wishlist
```
POST /api/wishlist/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "mongo-id"
}
```

#### Remove from Wishlist
```
POST /api/wishlist/remove
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "mongo-id"
}
```

#### Clear Wishlist
```
POST /api/wishlist/clear
Authorization: Bearer {token}
```

## 🧪 Testing with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import API collection (create manually or use examples above)
3. Test endpoints with different payloads

## 🔧 Configuration

### .env File
```
MONGODB_URI=mongodb://localhost:27017/smartcart
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Change Secret Key (Production)
In `.env` file, change:
```
JWT_SECRET=your_super_secret_key_min_32_characters_long
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
❌ Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Make sure MongoDB service is running
- Windows: `mongod` command
- Mac/Linux: `brew services start mongodb-community`

### Port Already in Use
```
❌ Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `.env`
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### Token Expiration
- Tokens expire after 7 days
- User needs to login again
- Change expiry in `authController.js` if needed

### CORS Error
- Make sure frontend is on different port than backend
- CORS is enabled in `server.js`

## 🚢 Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas URI
heroku config:set MONGODB_URI=your_atlas_uri

# Deploy
git push heroku main
```

### Deploy to Render
1. Push code to GitHub
2. Go to https://render.com
3. Connect GitHub repo
4. Set environment variables
5. Deploy

### Deploy to AWS EC2
- Launch EC2 instance
- Install Node.js
- Clone repository
- Run `npm install && npm start`
- Setup PM2 for process management

## 📚 Database Schema

### User
```javascript
{
  username: String (unique),
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Product
```javascript
{
  name: String,
  price: Number,
  rating: Number,
  category: String (enum),
  brand: String,
  img: String (URL),
  description: String,
  stock: Number,
  createdAt: Date
}
```

### Cart
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    name: String,
    price: Number,
    img: String,
    quantity: Number
  }],
  totalPrice: Number,
  updatedAt: Date
}
```

### Wishlist
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    name: String,
    price: Number,
    img: String,
    brand: String,
    rating: Number,
    addedAt: Date
  }],
  updatedAt: Date
}
```

## 🔐 Security Best Practices

✅ Implemented:
- Password hashing with bcryptjs
- JWT token authentication
- CORS enabled
- Input validation

⚠️ Additional recommendations:
- Use HTTPS in production
- Implement rate limiting
- Add request validation
- Use environment variables
- Enable HTTPS only cookies
- Add admin roles
- Implement refresh tokens
- Add audit logging

## 📝 Features

✅ User authentication (register/login)
✅ Product listing with advanced filters
✅ Shopping cart management
✅ Wishlist functionality
✅ MongoDB integration
✅ JWT authentication
✅ CORS enabled
✅ Auto product seeding
✅ Responsive design
✅ Auto-login on page reload

## 🤝 Support

For issues or questions:
1. Check troubleshooting section
2. Review MongoDB documentation
3. Check Express.js docs
4. Ask in community forums

## 📄 License

MIT License - Feel free to use this project

---

**Last Updated:** April 2026
**Version:** 1.0.0
