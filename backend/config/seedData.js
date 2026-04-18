const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log('✅ Products already seeded');
      return;
    }

    const products = [
      // Electronics
      { name: "Phone", price: 35000, rating: 4, category: "Electronics", brand: "Samsung Galaxy", img: "https://cdn.mos.cms.futurecdn.net/w97M5jZqNVx9gekuEmsWtg.jpg", description: "Latest Samsung Galaxy phone", stock: 50 },
      { name: "Phone", price: 20000, rating: 4, category: "Electronics", brand: "Realme12 Pro", img: "https://image01.realme.net/general/20230821/1692581604581e94ebbccbb884ed1b8ff273205f58b0b.png", description: "Realme 12 Pro smartphone", stock: 60 },
      { name: "Phone", price: 134900, rating: 4, category: "Electronics", brand: "iphone15", img: "https://images.macrumors.com/article-new/2023/08/iPhone-15-Pro-Colors-Mock-Feature.jpg", description: "Apple iPhone 15", stock: 30 },
      { name: "Phone", price: 25000, rating: 5, category: "Electronics", brand: "OnePlus12", img: "https://www.oneplus.com/content/dam/oasis/page/2024/global/product/waffle/share.jpg", description: "OnePlus 12 flagship", stock: 40 },
      { name: "Laptop", price: 55000, rating: 5, category: "Electronics", brand: "Dell", img: "https://winblogs.thesourcemediaassets.com/2016/09/Dell-Sept-14.jpg", description: "Dell laptop", stock: 25 },
      { name: "Laptop", price: 60000, rating: 5, category: "Electronics", brand: "Apple", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200", description: "Apple MacBook", stock: 20 },
      { name: "Headphones", price: 3000, rating: 4, category: "Electronics", brand: "Sony", img: "https://s.yimg.com/ny/api/res/1.2/g_1SdnKp2HBHOiXSaPpSJQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-04/1ee40cc2-e55b-11ed-b1fe-635016562860", description: "Sony wireless headphones", stock: 100 },
      { name: "Camera", price: 25000, rating: 4, category: "Electronics", brand: "Canon", img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535112cv1d.jpg", description: "Canon DSLR camera", stock: 35 },
      
      // Furniture
      { name: "Furniture", price: 35000, rating: 4, category: "Furnitures", brand: "Mattresses", img: "https://m.media-amazon.com/images/I/81RehOGToAL._AC_SL1500_.jpg", description: "Premium mattress", stock: 45 },
      { name: "Furnitures", price: 134900, rating: 4, category: "Furnitures", brand: "Recliner", img: "https://m.media-amazon.com/images/I/91kupf0JeEL._AC_.jpg", description: "Comfortable recliner", stock: 20 },
      { name: "Furnitures", price: 25000, rating: 5, category: "Furnitures", brand: "Coffee Table", img: "https://www.decasacollections.com/wp-content/uploads/2023/09/Unique-Coffee-Table.jpg", description: "Modern coffee table", stock: 50 },
      
      // Books
      { name: "Books", price: 35000, rating: 4, category: "Books", brand: "GK for all competitive exams", img: "https://rukmini1.flixcart.com/image/300/300/xif0q/regionalbooks/r/3/w/lucent-general-knowledge-2025-arihant-general-knowledge-2026-original-imahenhy3hnhyccz.jpeg", description: "General Knowledge book", stock: 80 },
      { name: "Books", price: 20000, rating: 4, category: "Books", brand: "Novel Book", img: "https://www.chetanbhagat.com/wp-content/uploads/2018/the-girl-in-room-105.png", description: "Popular novel", stock: 70 },
      { name: "Books", price: 134900, rating: 3, category: "Books", brand: "R.S Aggarwal", img: "https://m.media-amazon.com/images/I/81e0cBrgHIL._SL1500_.jpg", description: "Mathematics book", stock: 60 },
      
      // Fashion
      { name: "T-Shirt", price: 1500, rating: 4, category: "Fashion", brand: "Nike", img: "https://cdn1.bambinifashion.com/img/p/1/8/3/9/8/2/183982--product.jpg", description: "Nike t-shirt", stock: 200 },
      { name: "Jeans", price: 2000, rating: 5, category: "Fashion", brand: "Levi's", img: "https://img.giglio.com/imager/prodZoom/F41615.009_1/levi-s.jpg", description: "Levi's jeans", stock: 150 },
      { name: "Saree", price: 2000, rating: 4, category: "Fashion", brand: "Kalanjali Saree", img: "https://i.pinimg.com/736x/2e/6b/de/2e6bde5a4ee723a92f0a56ff937f5803.jpg", description: "Traditional saree", stock: 80 },
      { name: "Saree", price: 2500, rating: 5, category: "Fashion", brand: "Sambalpuri Saree", img: "https://utkalikaodisha.com/wp-content/uploads/2023/01/TRI3D__Smb_6__silk_set290_sowmyasri_side__2023-1-4-13-50-48__1200X1200_11zon.jpg", description: "Sambalpuri silk saree", stock: 60 },
      
      // Beauty
      { name: "Lipstick", price: 500, rating: 4, category: "Beauty", brand: "Nykaa Lipstick", img: "https://images-static.nykaa.com/media/catalog/product/1/8/18e24b08904245704247_5.jpg", description: "Nykaa lipstick", stock: 300 },
      { name: "Face Cream", price: 800, rating: 3, category: "Beauty", brand: "DERMDOC", img: "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/381492/dermdoc-2-percentage-kojic-acid-glow-fusion-formula-night-cream-50-gm-20_1_display_1720776164_0fed7e9c.jpg", description: "Face cream", stock: 250 },
      { name: "Face Wash", price: 800, rating: 3, category: "Beauty", brand: "Mamaeart Ubtan Natural glow", img: "https://i.pinimg.com/originals/7e/61/c8/7e61c89ccfa2fcc7a9dcc98e40fabdfc.png", description: "Natural face wash", stock: 200 },
      
      // Toys
      { name: "Toy Car", price: 700, rating: 4, category: "Toys", brand: "Toy car", img: "https://m.media-amazon.com/images/I/91BDMI6mMvL._AC_.jpg", description: "Remote control car", stock: 120 },
      { name: "Teddy Bear", price: 900, rating: 5, category: "Toys", brand: "Teddy Bear", img: "https://m.media-amazon.com/images/I/71qHFXa2cmL.jpg", description: "Soft teddy bear", stock: 150 },
      { name: "Doll House", price: 1200, rating: 4, category: "Toys", brand: "Doll House", img: "https://m.media-amazon.com/images/I/91hTi73SWWL._AC_SL1500_.jpg", description: "Miniature doll house", stock: 80 }
    ];

    await Product.insertMany(products);
    console.log('✅ ' + products.length + ' products seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
};

module.exports = seedProducts;
