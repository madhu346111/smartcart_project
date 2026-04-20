const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log('✅ Products already seeded');
      return;
    }

    const products = [
      { name: "Phone", price: 35000, rating: 4, category: "Electronics", brand: "Samsung Galaxy", img: "https://cdn.mos.cms.futurecdn.net/w97M5jZqNVx9gekuEmsWtg.jpg", description: "Latest Samsung Galaxy phone", stock: 50 },
      { name: "Phone", price: 20000, rating: 4, category: "Electronics", brand: "Realme12 Pro", img: "https://image01.realme.net/general/20230821/1692581604581e94ebbccbb884ed1b8ff273205f58b0b.png", description: "Realme 12 Pro smartphone", stock: 60 },
      { name: "Phone", price: 134900, rating: 4, category: "Electronics", brand: "iphone15", img: "https://images.macrumors.com/article-new/2023/08/iPhone-15-Pro-Colors-Mock-Feature.jpg", description: "Apple iPhone 15", stock: 30 },
      { name: "Phone", price: 25000, rating: 5, category: "Electronics", brand: "OnePlus12", img: "https://www.oneplus.com/content/dam/oasis/page/2024/global/product/waffle/share.jpg", description: "OnePlus 12 flagship", stock: 40 },

      { name: "Laptop", price: 55000, rating: 5, category: "Electronics", brand: "Dell", img: "https://winblogs.thesourcemediaassets.com/2016/09/Dell-Sept-14.jpg", description: "Dell laptop", stock: 25 },
      { name: "Laptop", price: 60000, rating: 5, category: "Electronics", brand: "Apple🍎", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200", description: "Apple MacBook", stock: 20 },
      { name: "Headphones", price: 3000, rating: 4, category: "Electronics", brand: "Sony", img: "https://s.yimg.com/ny/api/res/1.2/g_1SdnKp2HBHOiXSaPpSJQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-04/1ee40cc2-e55b-11ed-b1fe-635016562860", description: "Sony wireless headphones", stock: 100 },
      { name: "Camera", price: 25000, rating: 4, category: "Electronics", brand: "Canon", img: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6535/6535112cv1d.jpg", description: "Canon DSLR camera", stock: 35 },
      { name: "Refrigator", price: 25000, rating: 4, category: "Electronics", brand: "Samsung", img: "https://pmcaonline.org/wp-content/uploads/2019/10/samsung1-1.jpg", description: "Samsung refrigerator", stock: 15 },
      { name: "Washing Machine", price: 35000, rating: 4, category: "Electronics", brand: "LG", img: "https://www.lg.com/content/dam/channel/wcms/in/images/wm/fhp1412z9b/gallery/FHP1412Z9B-DZ-06.jpg/_jcr_content/renditions/thum-1600x1062.jpeg", description: "LG washing machine", stock: 20 },

      { name: "Furniture", price: 35000, rating: 4, category: "Furnitures", brand: "Mattresses", img: "https://m.media-amazon.com/images/I/81RehOGToAL._AC_SL1500_.jpg", description: "Premium mattress", stock: 45 },
      { name: "Furnitures", price: 134900, rating: 4, category: "Furnitures", brand: "Recliner", img: "https://m.media-amazon.com/images/I/91kupf0JeEL._AC_.jpg", description: "Comfortable recliner", stock: 20 },
      { name: "Furnitures", price: 25000, rating: 5, category: "Furnitures", brand: "Coffee Table", img: "https://www.decasacollections.com/wp-content/uploads/2023/09/Unique-Coffee-Table.jpg", description: "Modern coffee table", stock: 50 },

      { name: "Furnitures", price: 55000, rating: 5, category: "Furnitures", brand: "Kids seating", img: "https://i5.walmartimages.com/seo/Arlopu-2-Pieces-Plastic-Kids-Chairs-Set-3-Levels-Adjustable-Hight-Children-Chairs-for-Playrooms-Schools-Daycares-Max-Weight-220-lbs_db493221-9dad-403b-b975-65c24290839b.158aec6e8557eba4850e56b45ab31ef1.jpeg", description: "Kids seating chairs", stock: 30 },
      { name: "Furnitures", price: 60000, rating: 3, category: "Furnitures", brand: "Wardrobes", img: "https://res.litfad.com/site/img/item/2022/12/01/7212329/1200x1200.jpg", description: "Spacious wardrobe", stock: 25 },
      { name: "Furnitures", price: 3000, rating: 4, category: "Furnitures", brand: "Sofas", img: "https://img.freepik.com/premium-photo/sofa-furniture_920207-13658.jpg", description: "Comfortable sofa", stock: 40 },
      { name: "Furnitures", price: 25000, rating: 4, category: "Furnitures", brand: "Dining Table", img: "https://holloways.co.uk/img/ets_megamenu/tresco_01.jpeg", description: "Elegant dining table", stock: 35 },
      { name: "Furnitures", price: 25000, rating: 3, category: "Furnitures", brand: "Office Table", img: "https://ii1.pepperfry.com/media/catalog/product/m/i/1100x1210/milford-three-drawer-office-table-by-nilkamal-milford-three-drawer-office-table-by-nilkamal-0rb1v7.jpg", description: "Office table with drawers", stock: 28 },
      { name: "Furnitures", price: 35000, rating: 4, category: "Furnitures", brand: "TV Units", img: "https://www.orientbell.com/blog/wp-content/uploads/2023/04/Bedroom-TV-Unit-with-Lights.png", description: "TV unit with storage", stock: 22 },


      { name: "Books", price: 350, rating: 4, category: "Books", brand: "GK for all competitive exams", img: "https://rukmini1.flixcart.com/image/300/300/xif0q/regionalbooks/r/3/w/lucent-general-knowledge-2025-arihant-general-knowledge-2026-original-imahenhy3hnhyccz.jpeg", description: "General Knowledge book", stock: 80 },
      { name: "Books", price: 200, rating: 4, category: "Books", brand: "Novel Book", img: "https://www.chetanbhagat.com/wp-content/uploads/2018/the-girl-in-room-105.png", description: "Popular novel", stock: 70 },
      { name: "Books", price: 1349, rating: 3, category: "Books", brand: "R.S Aggarwal", img: "https://m.media-amazon.com/images/I/81e0cBrgHIL._SL1500_.jpg", description: "Mathematics book", stock: 60 },
      { name: "Books", price: 250, rating: 5, category: "Books", brand: "Chanakya Niti", img: "https://rukminim2.flixcart.com/image/832/832/xif0q/book/a/g/f/chanakya-niti-illustrated-hindi-original-imah3yph95kawdvz.jpeg?q=70&crop=false", description: "Chanakya Niti book", stock: 55 },

      { name: "Books", price: 550, rating: 5, category: "Books", brand: "Magic practice Books", img: "https://rukmini1.flixcart.com/image/300/300/xif0q/regionalbooks/j/s/5/magic-practice-copybook-english-handwriting-drawing-book-set-original-imagm7rfndg9ggj6.jpeg", description: "Magic practice books", stock: 90 },
      { name: "Books", price: 600, rating: 5, category: "Books", brand: "Odia Barnabodha Book", img: "https://i.ytimg.com/vi/wJgaqnsVtvU/maxresdefault.jpg", description: "Odia Barnabodha book", stock: 65 },
      { name: "Books", price: 300, rating: 4, category: "Books", brand: "Fairy Tale Books", img: "https://www.sawanonlinebookstore.com/zubyheet/2020/12/Rapunzel-2-scaled.jpg", description: "Fairy tale books", stock: 100 },
      { name: "Books", price: 250, rating: 4, category: "Books", brand: "Note Book", img: "https://m.media-amazon.com/images/I/51xJYvb9CrL._AC_.jpg", description: "Notebook", stock: 150 },
      { name: "Books", price: 350, rating: 3, category: "Books", brand: "Computer Book", img: "https://b3books.in/cdn/shop/files/computer.png?v=1763103023&width=823", description: "Computer book", stock: 75 },

      { name: "T-Shirt", price: 1500, rating: 4, category: "Fashion", brand: "Nike", img: "https://cdn1.bambinifashion.com/img/p/1/8/3/9/8/2/183982--product.jpg", description: "Nike t-shirt", stock: 200 },
      { name: "Jeans", price: 2000, rating: 5, category: "Fashion", brand: "Levi's", img: "https://img.giglio.com/imager/prodZoom/F41615.009_1/levi-s.jpg", description: "Levi's jeans", stock: 150 },
      { name: "Saree", price: 2000, rating: 4, category: "Fashion", brand: "Kalanjali Saree", img: "https://i.pinimg.com/736x/2e/6b/de/2e6bde5a4ee723a92f0a56ff937f5803.jpg", description: "Traditional saree", stock: 80 },
      { name: "Saree", price: 2500, rating: 5, category: "Fashion", brand: "Sambalpuri Saree", img: "https://utkalikaodisha.com/wp-content/uploads/2023/01/TRI3D__Smb_6__silk_set290_sowmyasri_side__2023-1-4-13-50-48__1200X1200_11zon.jpg", description: "Sambalpuri silk saree", stock: 60 },
      { name: "Kurti", price: 400, rating: 3, category: "Fashion", brand: "Biba Kurti", img: "https://www.biba.in/on/demandware.static/-/Sites-biba-product-catalog/default/dwe562a6fe/images/ss22/casualt18223ss22red_4.jpg", description: "Biba kurti", stock: 120 },
      { name: "Lehenga", price: 3000, rating: 5, category: "Fashion", brand: "Sabyasachi Red", img: "https://i.pinimg.com/originals/0b/59/d3/0b59d3aa7e22e72d7dc9f89f25af012f.jpg", description: "Sabyasachi lehenga", stock: 40 },
      { name: "Kurta", price: 3000, rating: 4, category: "Fashion", brand: "Gents Kurta", img: "https://i.pinimg.com/736x/4a/54/82/4a54825b863970d1eed858ba0cfe7728.jpg", description: "Gents kurta", stock: 90 },
      { name: "Jacket", price: 4000, rating: 5, category: "Fashion", brand: "Bomber Jacket", img: "https://img.drz.lazcdn.com/static/bd/p/6bc85c9d2880985147fa91381b975260.jpg_720x720q80.jpg", description: "Bomber jacket", stock: 70 },


      { name: "Lipstick", price: 500, rating: 4, category: "Beauty", brand: "Nykaa Lipstick", img: "https://images-static.nykaa.com/media/catalog/product/1/8/18e24b08904245704247_5.jpg", description: "Nykaa lipstick", stock: 300 },
      { name: "Face Cream", price: 800, rating: 3, category: "Beauty", brand: "DERMDOC", img: "https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/381492/dermdoc-2-percentage-kojic-acid-glow-fusion-formula-night-cream-50-gm-20_1_display_1720776164_0fed7e9c.jpg", description: "Face cream", stock: 250 },
      { name: "Face Wash", price: 800, rating: 3, category: "Beauty", brand: "Mamaeart Ubtan Natural glow", img: "https://i.pinimg.com/originals/7e/61/c8/7e61c89ccfa2fcc7a9dcc98e40fabdfc.png", description: "Natural face wash", stock: 200 },
      { name: "Mascara", price: 800, rating: 3, category: "Beauty", brand: "MAYBELLINE Mascara", img: "https://images.deprati.com.ec/sys-master/images/h84/ha5/12014120402974/17152513-1_product_1200Wx1800H", description: "Maybelline mascara", stock: 180 },
      { name: "Face Powder", price: 800, rating: 3, category: "Beauty", brand: "WhiteTone", img: "https://m.media-amazon.com/images/I/51raUEsDYEL._SL1500_.jpg", description: "Face powder", stock: 220 },
      { name: "Makeup Kit", price: 800, rating: 3, category: "Beauty", brand: "NY Bae All I Need Makeup Kit", img: "https://i5.walmartimages.com/asr/11f87436-46b1-4937-aeed-8424fb88ca8b.951ad283a31db9d0a9c2b13f0ec9fd55.jpeg", description: "Makeup kit", stock: 160 },
      { name: "Nail Polish", price: 800, rating: 3, category: "Beauty", brand: "Dazller Nail Polish", img: "https://rukmini1.flixcart.com/image/300/300/kflftzk0/nail-polish/a/u/q/30-nail-polish-eyetex-dazller-original-imafwyzfwz6npfgh.jpeg", description: "Nail polish", stock: 250 },

      { name: "Toy Car", price: 700, rating: 4, category: "Toys", brand: "Toy car", img: "https://m.media-amazon.com/images/I/91BDMI6mMvL._AC_.jpg", description: "Remote control car", stock: 120 },
      { name: "Teddy Bear", price: 900, rating: 5, category: "Toys", brand: "Teddy Bear", img: "https://m.media-amazon.com/images/I/71qHFXa2cmL.jpg", description: "Soft teddy bear", stock: 150 },
      { name: "Teddy Bear", price: 900, rating: 3, category: "Toys", brand: "Teddy Bear", img: "https://m.media-amazon.com/images/I/71aoM1ZFy1L.jpg", description: "Cute teddy bear", stock: 140 },
      { name: "Doll House", price: 1200, rating: 4, category: "Toys", brand: "Doll House", img: "https://m.media-amazon.com/images/I/91hTi73SWWL._AC_SL1500_.jpg", description: "Miniature doll house", stock: 80 },
      { name: "Kitchen Set", price: 400, rating: 4, category: "Toys", brand: "Kitchen Set", img: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1608747999-51Haoq4qN8L.jpg?crop=1xw:1.00xh;center,top&resize=480:*", description: "Toy kitchen set", stock: 110 },
      { name: "Lamps", price: 500, rating: 3, category: "Toys", brand: "Lamps", img: "https://m.media-amazon.com/images/I/810zVG3uGJL.jpg", description: "Toy lamps", stock: 130 },
      { name: "Train", price: 900, rating: 4, category: "Toys", brand: "Train", img: "https://m.media-amazon.com/images/I/71wK8FDWOwL._AC_SL1500_.jpg", description: "Toy train", stock: 95 },
      { name: "Train", price: 900, rating: 5, category: "Toys", brand: "Doremon", img: "https://i5.walmartimages.com/seo/Doraemon-Doll-Plush-Toy-Large-Dingdang-Cat-Doll-Cartoon-Anime-Gifts-Girl-s-Birthday_3d881652-12e5-406c-ad56-c8c34479c480.9ea5836d8dd6a1edb2d029e839c3bf90.jpeg", description: "Doraemon toy train", stock: 85 },



    ];

    await Product.insertMany(products);
    console.log('✅ ' + products.length + ' products seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
  }
};

module.exports = seedProducts;
