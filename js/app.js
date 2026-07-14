/* ============================================
   Rasa Jawara — App Logic
   app.js — Products, Cart, Filters
   ============================================ */

let allProducts = [];
let cart = [];
let currentCategory = "Semua";
let searchQuery = "";

// ——— Cache Strategy ———
const CACHE_KEY = "rjs_products";
const CACHE_TIME_KEY = "rjs_products_time";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedProducts() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const time = parseInt(localStorage.getItem(CACHE_TIME_KEY) || "0");
    if (cached && Date.now() - time < CACHE_DURATION) {
      return JSON.parse(cached);
    }
  } catch (e) {}
  return null;
}

function setCachedProducts(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
  } catch (e) {}
}

// ——— Skeleton Loading ———
function renderSkeletons(count = 6) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "skeleton-card";
    card.innerHTML = `
      <div class="skeleton-img skeleton"></div>
      <div class="p-6">
        <div class="skeleton skeleton-text" style="width:75%;height:1.25rem;"></div>
        <div class="skeleton skeleton-text short" style="height:0.875rem;margin-top:0.75rem;"></div>
        <div class="skeleton skeleton-text short" style="height:0.875rem;width:40%;margin-top:0.5rem;"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.5rem;padding-top:1rem;border-top:1px solid #f3f4f6;">
          <div class="skeleton" style="width:40%;height:1.5rem;"></div>
          <div class="skeleton" style="width:3rem;height:3rem;border-radius:50%;"></div>
        </div>
      </div>
    `;
    list.appendChild(card);
  }
}

// ——— Load Products ———
async function loadProducts() {
  // Try cache first
  const cached = getCachedProducts();
  if (cached) {
    allProducts = cached;
    applyFilters();
    // Refresh in background
    fetchFreshProducts().catch(() => {});
    return;
  }

  // Show skeleton loading
  renderSkeletons();

  // Fetch fresh
  await fetchFreshProducts();
}

async function fetchFreshProducts() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(CONFIG.API_URL + "?action=getProducts", {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const json = await response.json();
    if (json.status === "success") {
      allProducts = json.data;
      setCachedProducts(allProducts);
      applyFilters();
    }
  } catch (error) {
    if (allProducts.length === 0) {
      document.getElementById("product-list").innerHTML = `
        <div class="col-span-full text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8A165" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 opacity-50"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          <p class="text-gray-500 font-medium">Gagal memuat produk.</p>
          <button onclick="loadProducts()" class="mt-4 px-6 py-2 bg-jawara-gold text-white rounded-full font-semibold hover:bg-jawara-brown transition text-sm ripple-btn">
            Coba Lagi
          </button>
        </div>`;
    }
  }
}

// ——— Category Filter ———
function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".cat-btn").forEach((btn) => {
    btn.classList.remove("cat-btn-active");
    btn.classList.add("bg-white", "text-jawara-brown", "border-gray-300");
  });
  const activeBtn = document.getElementById(`btn-${cat}`);
  if (activeBtn) {
    activeBtn.classList.add("cat-btn-active");
    activeBtn.classList.remove("bg-white", "text-jawara-brown", "border-gray-300");
  }
  applyFilters();
}

// ——— Search ———
function handleSearch(query) {
  searchQuery = query.toLowerCase();
  applyFilters();
}

// ——— Apply Filters ———
function applyFilters() {
  const filtered = allProducts.filter((p) => {
    const matchCategory =
      currentCategory === "Semua" || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery);
    return matchCategory && matchSearch;
  });
  renderProducts(filtered);
}

// ——— Render Products ———
function renderProducts(data) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = `
      <div class="col-span-full text-center text-gray-500 italic py-16 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-3 text-gray-300"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
        <p>Produk tidak ditemukan.</p>
      </div>`;
    return;
  }

  data.forEach((product, index) => {
    const isSoldOut = product.status === "Habis";
    const overlay = isSoldOut
      ? `<div class="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-[1px]"><span class="bg-red-600 text-white px-6 py-2 font-bold transform -rotate-12 border-4 border-white shadow-xl text-xl">SOLD OUT</span></div>`
      : "";

    const btnAction = isSoldOut
      ? `<button disabled class="bg-gray-200 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center cursor-not-allowed"><i class="fa-solid fa-ban"></i></button>`
      : `<button onclick="addToCart('${product.id}'); event.stopPropagation();" class="bg-jawara-brown text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-jawara-gold hover:scale-110 transition active:scale-95 ripple-btn"><i class="fa-solid fa-plus text-lg"></i></button>`;

    const card = document.createElement("div");
    card.className = "product-card bg-white rounded-2xl shadow-md overflow-hidden group flex flex-col cursor-pointer stagger-item";
    card.style.transitionDelay = `${index * 60}ms`;
    card.onclick = () => openProductDetail(product.id);
    card.innerHTML = `
      <div class="h-64 overflow-hidden relative">
        ${overlay}
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="card-img w-full h-full object-cover ${isSoldOut ? "grayscale" : ""}">
        <div class="absolute top-4 left-4 bg-jawara-gold/90 backdrop-blur text-jawara-brown text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase">${product.category}</div>
      </div>
      <div class="p-6 flex flex-col flex-1">
        <div class="flex-1 mb-4">
          <h3 class="text-xl font-bold font-serif text-jawara-brown mb-2 line-clamp-1 group-hover:text-jawara-gold transition">${product.name}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">${product.desc}</p>
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-gray-100">
          <div><p class="text-xs text-gray-400 mb-1">Harga:</p><span class="text-xl font-bold text-jawara-brown">Rp ${parseInt(product.price).toLocaleString("id-ID")}</span></div>
          ${btnAction}
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  // Trigger staggered animation
  requestAnimationFrame(() => animateCards());
}

// ——— Cart Logic ———
function addToCart(id) {
  const product = allProducts.find((p) => String(p.id) === String(id));
  if (!product) return;

  const existingItem = cart.find((item) => String(item.id) === String(id));
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  toggleCart(true);

  // Toast + badge pulse
  showToast(`${product.name} ditambahkan ke keranjang`);
  const badge = document.getElementById("cart-count");
  badge.classList.remove("badge-pulse");
  void badge.offsetWidth; // Force reflow
  badge.classList.add("badge-pulse");
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const btnCheckout = document.getElementById("btn-checkout");
  cartItems.innerHTML = "";
  let total = 0,
    itemCount = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center opacity-50 space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <p class="text-gray-500">Keranjang masih kosong.</p>
      </div>`;
    btnCheckout.disabled = true;
    cartCount.classList.add("hidden");
  } else {
    btnCheckout.disabled = false;
    cartCount.classList.remove("hidden");
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      itemCount += item.qty;
      const div = document.createElement("div");
      div.className =
        "flex justify-between items-center bg-jawara-cream/50 p-4 rounded-xl border border-jawara-gold/20";
      div.innerHTML = `
        <div class="flex items-center gap-4 flex-1">
          <img src="${item.image}" class="w-16 h-16 object-cover rounded-lg shadow-sm border border-white" loading="lazy">
          <div>
            <h4 class="font-bold text-jawara-brown font-serif line-clamp-1">${item.name}</h4>
            <p class="text-sm text-jawara-gold font-bold">Rp ${parseInt(item.price).toLocaleString("id-ID")}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-white px-2 py-1 rounded-full shadow-sm border">
          <button onclick="changeQty(${index}, -1)" class="w-7 h-7 hover:bg-gray-100 rounded-full text-gray-500 flex items-center justify-center"><i class="fa-solid fa-minus text-xs"></i></button>
          <span class="font-bold text-jawara-brown w-4 text-center">${item.qty}</span>
          <button onclick="changeQty(${index}, 1)" class="w-7 h-7 hover:bg-gray-100 rounded-full text-gray-500 flex items-center justify-center"><i class="fa-solid fa-plus text-xs"></i></button>
        </div>`;
      cartItems.appendChild(div);
    });
  }

  cartCount.innerText = itemCount;
  const formattedTotal = "Rp " + total.toLocaleString("id-ID");
  document.getElementById("cart-total").innerText = formattedTotal;
  document.getElementById("checkout-total").innerText = formattedTotal;
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCartUI();
}

// ——— Initialize ———
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  initUI();
});
