/* SmartCart Frontend - Backend Integration Script */

// API Configuration
const API_URL = "http://localhost:5000/api";
let currentUser = null;
let currentToken = null;

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function login() {
  const user = document.getElementById("username")?.value.trim();
  const pass = document.getElementById("password")?.value.trim();
  const error = document.getElementById("error");

  if (!user || !pass) {
    if (error) error.innerText = "Please fill all fields";
    return;
  }

  if (error) error.innerText = "Connecting...";
  console.log("Login attempt:", user);

  // Try login first
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then(res => {
      console.log("Login response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Login response data:", data);
      if (data.error) {
        console.log("Login failed, trying to register...");
        // If login fails, try register
        if (error) error.innerText = "Creating new account...";
        return fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, password: pass, email: user + "@smartcart.com" })
        });
      } else {
        loginSuccess(data);
        return null;
      }
    })
    .then(res => {
      if (res) {
        console.log("Register response status:", res.status);
        return res.json();
      }
      return null;
    })
    .then(registerData => {
      if (registerData) {
        console.log("Register response data:", registerData);
        if (registerData.error) {
          if (error) error.innerText = "❌ " + registerData.error;
        } else {
          loginSuccess(registerData);
        }
      }
    })
    .catch(err => {
      console.error("Error:", err);
      if (error) error.innerText = "❌ Connection error: " + err.message;
    });
}

function loginSuccess(data) {
  currentToken = data.token;
  currentUser = data.user;
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  document.getElementById("error").innerText = "";
  openStore();
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  currentUser = null;
  currentToken = null;
  location.reload();
}

// ============================================
// STORE PAGE MANAGEMENT
// ============================================

function openStore() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("store-page").style.display = "block";
  renderProducts();
  renderCart();
  renderWishlist();
}

// ============================================
// AUTO LOGIN ON PAGE LOAD
// ============================================

window.addEventListener("load", function () {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    currentToken = token;
    currentUser = JSON.parse(user);
    openStore();
  }
});

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

let products = [];

function renderProducts() {
  const search = document.getElementById("search")?.value?.toLowerCase() || "";
  const category = document.getElementById("category-filter")?.value || "all";
  const priceFilter = document.getElementById("price-filter")?.value || "all";
  const ratingFilter = document.getElementById("rating-filter")?.value || "all";

  let query = `${API_URL}/products?`;
  if (search) query += `search=${encodeURIComponent(search)}&`;
  if (category && category !== "all") query += `category=${category}&`;
  if (priceFilter === "low") query += `maxPrice=20000&`;
  if (priceFilter === "high") query += `minPrice=20000&`;
  if (ratingFilter && ratingFilter !== "all") query += `rating=${ratingFilter}&`;

  fetch(query)
    .then(res => res.json())
    .then(data => {
      products = data;
      const list = document.getElementById("product-list");
      if (!list) return;
      list.innerHTML = "";

      if (data.length === 0) {
        list.innerHTML = "<h2 style='text-align:center; grid-column: 1/-1;'>❌ No products found</h2>";
        return;
      }

      data.forEach(p => {
        list.innerHTML += `
        <div class="card">
          <img src="${p.img}" alt="${p.brand}">
          <div class="card-content">
            <h3>${p.brand}</h3>
            <p>₹${p.price} ⭐${p.rating}</p>
            <div class="btn" onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Cart</div>
            <div class="btn" onclick="addToWishlist('${p._id}', '${p.name}', ${p.price})">❤️</div>
            <div class="btn" onclick="showDetails('${p.name}', '${p.brand}', ${p.price}, ${p.rating}, '${p.img}')">Details</div>
          </div>
        </div>`;
      });
    })
    .catch(err => console.error("Error loading products:", err));
}

// ============================================
// BANNER SLIDER
// ============================================

let index = 0;

function moveSlide(dir) {
  const track = document.getElementById("bannerTrack");
  if (!track) return;
  const total = track.children.length;

  index += dir;
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;

  track.style.transform = `translateX(-${index * 100}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  if (prevBtn) prevBtn.onclick = () => moveSlide(-1);
  if (nextBtn) nextBtn.onclick = () => moveSlide(1);
});

// Auto slide every 3 seconds
setInterval(() => moveSlide(1), 3000);

// ============================================
// CART FUNCTIONS
// ============================================

function addToCart(productId, name, price) {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentToken}`
    },
    body: JSON.stringify({
      productId: productId,
      quantity: 1
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        updateCartCount(data.cart.items.length);
        renderCart();
      }
    })
    .catch(err => console.error("Error adding to cart:", err));
}

function renderCart() {
  if (!currentUser) return;

  fetch(`${API_URL}/cart`, {
    headers: { "Authorization": `Bearer ${currentToken}` }
  })
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("cart-items");
      if (!div) return;
      div.innerHTML = "";

      if (!data.items || data.items.length === 0) {
        div.innerHTML = "<p style='text-align:center; padding: 20px;'>Cart is empty</p>";
        return;
      }

      data.items.forEach((item) => {
        div.innerHTML += `
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:#f9f9f9;
          padding:10px;
          margin:8px 0;
          border-radius:8px;
          box-shadow:0 2px 5px rgba(0,0,0,0.2);
        ">
          <div style="flex: 1;">
            <span style="font-weight:bold;">
              ${item.name} - ₹${item.price}
            </span>
            <br>
            <small>Qty: ${item.quantity}</small>
          </div>
          <button onclick="removeFromCart('${item.productId}')" 
            style="
              background:red;
              color:white;
              border:none;
              padding:5px 10px;
              border-radius:5px;
              cursor:pointer;
            ">
            Remove
          </button>
        </div>`;
      });

      div.innerHTML += `
      <div style="
        margin-top: 20px;
        padding: 15px;
        background: #e8f5e9;
        border-radius: 8px;
        font-weight: bold;
      ">
        Total: ₹${data.totalPrice || 0}
      </div>`;
    })
    .catch(err => console.error("Error loading cart:", err));
}

function removeFromCart(productId) {
  if (!currentUser) return;

  fetch(`${API_URL}/cart/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentToken}`
    },
    body: JSON.stringify({ productId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        updateCartCount(data.cart.items.length);
        renderCart();
      }
    })
    .catch(err => console.error("Error removing from cart:", err));
}

function updateCartCount(count) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = count;
}

// ============================================
// WISHLIST FUNCTIONS
// ============================================

function addToWishlist(productId, name, price) {
  if (!currentUser) {
    alert("Please login first!");
    return;
  }

  fetch(`${API_URL}/wishlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentToken}`
    },
    body: JSON.stringify({ productId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        updateWishlistCount(data.wishlist.items.length);
        renderWishlist();
      }
    })
    .catch(err => console.error("Error adding to wishlist:", err));
}

function renderWishlist() {
  if (!currentUser) return;

  fetch(`${API_URL}/wishlist`, {
    headers: { "Authorization": `Bearer ${currentToken}` }
  })
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("wishlist-items");
      if (!div) return;
      div.innerHTML = "";

      if (!data.items || data.items.length === 0) {
        div.innerHTML = "<p style='text-align:center; padding: 20px;'>Wishlist is empty</p>";
        return;
      }

      data.items.forEach((item) => {
        div.innerHTML += `
        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:#fff;
          padding:10px;
          margin:8px 0;
          border-radius:8px;
          box-shadow:0 2px 5px rgba(0,0,0,0.2);
        ">
          <span style="font-weight:bold;">
            ❤️ ${item.name} - ₹${item.price}
          </span>
          <button onclick="removeFromWishlist('${item.productId}')" 
            style="
              background:#ff6f61;
              color:white;
              border:none;
              padding:5px 10px;
              border-radius:5px;
              cursor:pointer;
              transition:0.3s;
            "
            onmouseover="this.style.background='darkred'"
            onmouseout="this.style.background='#ff6f61'"
          >
            Remove
          </button>
        </div>`;
      });
    })
    .catch(err => console.error("Error loading wishlist:", err));
}

function removeFromWishlist(productId) {
  if (!currentUser) return;

  fetch(`${API_URL}/wishlist/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${currentToken}`
    },
    body: JSON.stringify({ productId })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        updateWishlistCount(data.wishlist.items.length);
        renderWishlist();
      }
    })
    .catch(err => console.error("Error removing from wishlist:", err));
}

function updateWishlistCount(count) {
  const wishlistCount = document.getElementById("wishlist-count");
  if (wishlistCount) wishlistCount.innerText = count;
}

// ============================================
// MODALS
// ============================================

function toggleCart() {
  const m = document.getElementById("cart-modal");
  if (m) {
    m.style.display = m.style.display === "flex" ? "none" : "flex";
    if (m.style.display === "flex") renderCart();
  }
}

function toggleWishlist() {
  const m = document.getElementById("wishlist-modal");
  if (m) {
    m.style.display = m.style.display === "flex" ? "none" : "flex";
    if (m.style.display === "flex") renderWishlist();
  }
}

function showDetails(name, brand, price, rating, img) {
  const modal = document.getElementById("details-modal");
  const content = document.getElementById("details-content");

  if (!modal || !content) return;

  content.innerHTML = `
    <div style="text-align:center;">
      <img src="${img}" style="width:100%; height:200px; object-fit:cover; border-radius:10px;">
      <h2>${brand}</h2>
      <p><b>Product:</b> ${name}</p>
      <p><b>Price:</b> ₹${price}</p>
      <p><b>Rating:</b> ⭐${rating}</p>
      <button id="closeDetailsBtn" style="
        margin-top:10px;
        padding:8px 15px;
        background:#ff6f61;
        color:white;
        border:none;
        border-radius:5px;
        cursor:pointer;
      ">
        Close
      </button>
    </div>
  `;

  modal.style.display = "flex";
  document.getElementById("closeDetailsBtn").onclick = () => {
    modal.style.display = "none";
  };
}

window.onclick = (e) => {
  const modal = document.getElementById("details-modal");
  if (modal && e.target === modal) {
    modal.style.display = "none";
  }
};

// ============================================
// FILTERS & SEARCH
// ============================================

function filterCategory(cat) {
  const filterEl = document.getElementById("category-filter");
  if (filterEl) {
    filterEl.value = cat;
    renderProducts();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchEl = document.getElementById("search");
  const categoryEl = document.getElementById("category-filter");
  const priceEl = document.getElementById("price-filter");
  const ratingEl = document.getElementById("rating-filter");

  if (searchEl) searchEl.addEventListener("keyup", () => {
    clearTimeout(searchEl.searchTimeout);
    searchEl.searchTimeout = setTimeout(renderProducts, 300);
  });
  if (categoryEl) categoryEl.addEventListener("change", renderProducts);
  if (priceEl) priceEl.addEventListener("change", renderProducts);
  if (ratingEl) ratingEl.addEventListener("change", renderProducts);
});
