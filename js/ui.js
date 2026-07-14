/* ============================================
   Rasa Jawara — UI Interactions
   ui.js — Modals, Nav, Scroll, Animations
   ============================================ */

// ——— SVG Icon Library ———
const ICONS = {
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  navigation: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  cartPlus: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/><path d="M9 11h6"/><path d="M12 8v6"/></svg>`,
};

// ——— Toast Notification ———
function showToast(message, duration = 2500) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${ICONS.check} ${message}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ——— Mobile Menu ———
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("mobile-menu-icon");
  menu.classList.toggle("hidden");
  if (!menu.classList.contains("hidden")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
}

// ——— Cart Modal ———
function toggleCart(forceOpen = false) {
  const modal = document.getElementById("cart-modal");
  const panel = document.getElementById("cart-panel");
  if (forceOpen || modal.classList.contains("hidden")) {
    modal.classList.remove("hidden", "pointer-events-none");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      panel.classList.remove("translate-x-full");
    }, 10);
  } else {
    panel.classList.add("translate-x-full");
    modal.classList.add("opacity-0");
    setTimeout(() => {
      modal.classList.add("hidden", "pointer-events-none");
    }, 300);
  }
}

// ——— Product Detail Modal ———
function openProductDetail(id) {
  const p = allProducts.find((item) => String(item.id) === String(id));
  if (!p) return;
  document.getElementById("modal-img").src = p.image;
  document.getElementById("modal-img").setAttribute("loading", "eager");
  document.getElementById("modal-category").innerText = p.category;
  document.getElementById("modal-title").innerText = p.name;
  document.getElementById("modal-desc-short").innerText = p.desc;
  document.getElementById("modal-desc-long").innerHTML = p.detail
    ? p.detail.replace(/\n/g, "<br>")
    : "Belum ada detail tambahan.";
  document.getElementById("modal-price").innerText =
    "Rp " + parseInt(p.price).toLocaleString("id-ID");

  const btn = document.getElementById("modal-btn-add");
  const overlay = document.getElementById("modal-status-overlay");
  if (p.status === "Habis") {
    btn.disabled = true;
    btn.className = "w-full bg-gray-300 text-gray-500 font-bold py-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-3";
    btn.innerHTML = "STOK HABIS";
    overlay.classList.remove("hidden");
    document.getElementById("modal-img").classList.add("grayscale");
  } else {
    btn.disabled = false;
    btn.className = "w-full bg-[#4A3321] text-white font-bold py-4 rounded-xl hover:bg-[#C8A165] transition flex items-center justify-center gap-3 shadow-lg group ripple-btn";
    btn.innerHTML = `<span>TAMBAH KE KERANJANG</span> ${ICONS.cartPlus}`;
    btn.onclick = function () {
      addToCart(p.id);
      closeProductDetail();
    };
    overlay.classList.add("hidden");
    document.getElementById("modal-img").classList.remove("grayscale");
  }

  const modal = document.getElementById("product-detail-modal");
  const panel = document.getElementById("detail-panel");
  modal.classList.remove("hidden", "pointer-events-none");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    panel.classList.remove("scale-95");
  }, 10);
}

function closeProductDetail() {
  const modal = document.getElementById("product-detail-modal");
  const panel = document.getElementById("detail-panel");
  modal.classList.add("opacity-0");
  panel.classList.add("scale-95");
  setTimeout(() => {
    modal.classList.add("hidden", "pointer-events-none");
  }, 300);
}

// ——— Checkout Modal ———
function showCheckoutForm() {
  toggleCart();
  const modal = document.getElementById("checkout-modal");
  const panel = document.getElementById("checkout-panel");
  modal.classList.remove("hidden", "pointer-events-none");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    panel.classList.remove("scale-95");
  }, 10);
}

function closeCheckout() {
  const modal = document.getElementById("checkout-modal");
  const panel = document.getElementById("checkout-panel");
  modal.classList.add("opacity-0");
  panel.classList.add("scale-95");
  setTimeout(() => {
    modal.classList.add("hidden", "pointer-events-none");
  }, 300);
}

// ——— Navbar: Shrink on Scroll + Active Section ———
function initNavbar() {
  const nav = document.querySelector("nav");
  const navContainer = nav.querySelector(".container");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Shrink
    if (window.scrollY > 80) {
      navContainer.classList.add("py-2");
      navContainer.classList.remove("py-3");
      nav.classList.add("shadow-lg");
    } else {
      navContainer.classList.remove("py-2");
      navContainer.classList.add("py-3");
      nav.classList.remove("shadow-lg");
    }

    // Active section highlight
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active", "text-jawara-gold");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active", "text-jawara-gold");
      }
    });
  });
}

// ——— Scroll Reveal Animations ———
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));
}

// ——— Staggered Card Animation ———
function animateCards() {
  const cards = document.querySelectorAll(".stagger-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => observer.observe(card));
}

// ——— Hero Typed Text ———
function initTypedText() {
  const el = document.getElementById("typed-tagline");
  if (!el) return;

  const phrases = [
    "Warisan Nusantara",
    "Oleh-oleh Premium",
    "Khas Tanah Jawara",
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTimer = 0;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pauseTimer = 2000;
        deleting = true;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = deleting ? 40 : 80;
    setTimeout(type, pauseTimer || speed);
    pauseTimer = 0;
  }

  type();
}

// ——— Hero Particles ———
function initParticles() {
  const hero = document.getElementById("home");
  if (!hero) return;

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = Math.random() * 30 + "%";
    particle.style.animationDelay = Math.random() * 4 + "s";
    particle.style.animationDuration = 3 + Math.random() * 3 + "s";
    particle.style.width = 2 + Math.random() * 4 + "px";
    particle.style.height = particle.style.width;
    hero.style.position = "relative";
    hero.style.overflow = "hidden";
    hero.appendChild(particle);
  }
}

// ——— Ripple Effect on Buttons ———
function initRipple() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".ripple-btn");
    if (!btn) return;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// ——— Initialize All UI ———
function initUI() {
  initNavbar();
  initScrollReveal();
  initTypedText();
  initParticles();
  initRipple();
}
