/* ============================================
   LUXE Bakery - Premium Bakery Website
   script.js - Single JavaScript File
   ============================================ */

(function () {
  'use strict';

  // ---------- Product Data (INR) ----------
  const products = [
    { id: 1, name: 'Artisan Sourdough Bread', category: 'Breads', price: 149, oldPrice: 179, rating: 4.8, reviews: 124, badge: 'new', img: 'images/products/artisan-bread.svg' },
    { id: 2, name: 'Classic Layer Cake', category: 'Cakes', price: 699, oldPrice: 899, rating: 4.9, reviews: 98, badge: 'sale', img: 'images/products/layer-cake.svg' },
    { id: 3, name: 'Butter Croissant', category: 'Pastries', price: 149, oldPrice: null, rating: 4.7, reviews: 210, badge: null, img: 'images/products/croissant.svg' },
    { id: 4, name: 'Strawberry Glazed Donut', category: 'Pastries', price: 99, oldPrice: null, rating: 4.6, reviews: 187, badge: null, img: 'images/products/donut.svg' },
    { id: 5, name: 'Double Chocolate Cookie', category: 'Cookies', price: 129, oldPrice: null, rating: 4.8, reviews: 312, badge: 'best', img: 'images/products/chocolate-cookie.svg' },
    { id: 6, name: 'Berry Danish Pastry', category: 'Pastries', price: 179, oldPrice: 229, rating: 4.7, reviews: 156, badge: 'sale', img: 'images/products/danish-pastry.svg' },
    { id: 7, name: 'Caramel Latte', category: 'Coffee', price: 199, oldPrice: null, rating: 4.9, reviews: 243, badge: null, img: 'images/products/latte.svg' },
    { id: 8, name: 'Belgian Chocolate Cake', category: 'Cakes', price: 999, oldPrice: 1299, rating: 4.9, reviews: 89, badge: 'sale', img: 'images/products/chocolate-cake.svg' },
    { id: 9, name: 'Blueberry Muffin', category: 'Pastries', price: 129, oldPrice: null, rating: 4.6, reviews: 198, badge: 'new', img: 'images/products/blueberry-muffin.svg' },
    { id: 10, name: 'French Baguette', category: 'Breads', price: 149, oldPrice: null, rating: 4.8, reviews: 167, badge: null, img: 'images/products/french-baguette.svg' },
    { id: 11, name: 'Cinnamon Swirl Roll', category: 'Pastries', price: 129, oldPrice: null, rating: 4.7, reviews: 145, badge: 'best', img: 'images/products/cinnamon-roll.svg' },
    { id: 12, name: 'Rose Macaron', category: 'Cookies', price: 179, oldPrice: null, rating: 4.8, reviews: 201, badge: null, img: 'images/products/macaron.svg' },
    { id: 13, name: 'Classic Cupcake', category: 'Cakes', price: 129, oldPrice: null, rating: 4.6, reviews: 178, badge: null, img: 'images/products/cupcake.svg' },
    { id: 14, name: 'Avocado Croissant Sandwich', category: 'Pastries', price: 249, oldPrice: null, rating: 4.7, reviews: 134, badge: 'new', img: 'images/products/croissant-sandwich.svg' },
    { id: 15, name: 'Rustic Sourdough Loaf', category: 'Breads', price: 199, oldPrice: null, rating: 4.9, reviews: 112, badge: null, img: 'images/products/sourdough.svg' },
    { id: 16, name: 'Classic Tiramisu', category: 'Cakes', price: 399, oldPrice: 499, rating: 4.8, reviews: 156, badge: 'sale', img: 'images/products/tiramisu.svg' }
  ];

  // ---------- Helpers ----------
  function formatPrice(price) {
    return '\u20B9' + price.toLocaleString('en-IN');
  }

  function generateOrderId() {
    var d = new Date();
    var datePart = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    var rand = Math.floor(1000 + Math.random() * 9000);
    return 'LUXE-' + datePart + '-' + rand;
  }

  // ---------- State ----------
  let cart = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('luxe_wishlist') || '[]');

  // ---------- Determine current page ----------
  function getCurrentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '' || path === '/') path = 'index.html';
    return path;
  }

  // ---------- Load Components ----------
  async function loadComponents() {
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');

    if (headerEl) {
      try {
        var resp = await fetch('components/header.html');
        if (resp.ok) {
          headerEl.innerHTML = await resp.text();
        }
      } catch (e) {
        console.warn('Could not load header component:', e);
      }
    }

    if (footerEl) {
      try {
        var resp = await fetch('components/footer.html');
        if (resp.ok) {
          footerEl.innerHTML = await resp.text();
        }
      } catch (e) {
        console.warn('Could not load footer component:', e);
      }
    }
  }

  // ---------- Set Active Nav Link ----------
  function setActiveNavLink() {
    var page = getCurrentPage();
    var pageMap = {
      'index.html': 'home',
      'about.html': 'about',
      'shop.html': 'shop',
      'product-details.html': 'shop',
      'gallery.html': 'gallery',
      'contact.html': 'contact',
      'checkout.html': 'checkout',
      'order-success.html': 'checkout',
      'login.html': 'auth',
      'register.html': 'auth',
      'forgot-password.html': 'auth',
      'profile.html': 'profile',
      '404.html': '404'
    };
    var activeKey = pageMap[page] || 'home';

    document.querySelectorAll('[data-nav]').forEach(function (item) {
      var navKey = item.getAttribute('data-nav');
      var link = item.querySelector('.nav-link');
      if (!link) return;
      if (navKey === activeKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ---------- DOM Ready ----------
  document.addEventListener('DOMContentLoaded', async function () {
    await loadComponents();
    initLoader();
    initTheme();
    initNavbar();
    setActiveNavLink();
    initScrollTop();
    initCounters();
    initToast();
    updateCartCount();
    updateWishlistCount();
    initSearchOverlay();
    initDrawers();
    updateAuthUI();

    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
    }

    initProductButtons();
    initShopFilters();
    initNewsletterForm();
    initContactForm();
    initGalleryFilter();
    initCheckout();
    initProfilePage();
    initAuthPages();
  });

  // ---------- Loader ----------
  function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('loaded'); }, 600);
    });
    setTimeout(function () { loader.classList.add('loaded'); }, 3000);
  }

  // ---------- Theme ----------
  function initTheme() {
    var saved = localStorage.getItem('luxe_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    syncThemeIcon(saved);
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.theme-toggle');
      if (btn) {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('luxe_theme', next);
        syncThemeIcon(next);
      }
    });
  }
  function syncThemeIcon(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(function (icon) {
      if (theme === 'dark') {
        icon.className = 'bi bi-sun';
      } else {
        icon.className = 'bi bi-moon-stars';
      }
    });
  }

  // ---------- Navbar ----------
  function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---------- Scroll Top ----------
  function initScrollTop() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.scroll-top');
      if (btn) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    window.addEventListener('scroll', function () {
      var btn = document.querySelector('.scroll-top');
      if (!btn) return;
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
  }

  // ---------- Counters ----------
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'));
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var duration = 2000;
          var start = 0;
          var step = target / (duration / 16);
          function animate() {
            start += step;
            if (start >= target) {
              el.textContent = prefix + target.toLocaleString() + suffix;
            } else {
              el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
              requestAnimationFrame(animate);
            }
          }
          animate();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { observer.observe(c); });
  }

  // ---------- Toast ----------
  var toastContainer;
  function initToast() {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  function showToast(message, icon) {
    if (!toastContainer) return;
    icon = icon || 'bi-check-circle-fill';
    var toast = document.createElement('div');
    toast.className = 'luxe-toast';
    toast.innerHTML = '<i class="bi ' + icon + '"></i><span>' + message + '</span>';
    toastContainer.appendChild(toast);
    setTimeout(function () {
      toast.classList.add('removing');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  // ---------- Cart ----------
  function addToCart(productId) {
    var product = products.find(function (p) { return p.id === productId; });
    if (!product) return;
    var existing = cart.find(function (item) { return item.id === productId; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, category: product.category, rating: product.rating, qty: 1 });
    }
    saveCart();
    updateCartCount();
    renderCartDrawer();
    showToast(product.name + ' added to cart');
  }
  function removeFromCart(productId) {
    cart = cart.filter(function (item) { return item.id !== productId; });
    saveCart();
    updateCartCount();
    renderCartDrawer();
  }
  function updateCartQty(productId, qty) {
    var item = cart.find(function (i) { return i.id === productId; });
    if (item) {
      item.qty = Math.max(1, qty);
      saveCart();
      updateCartCount();
      renderCartDrawer();
    }
  }
  function saveCart() {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }
  function getCartTotal() {
    return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }
  function getCartItemCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }
  function updateCartCount() {
    var count = getCartItemCount();
    document.querySelectorAll('.cart-count').forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // ---------- Wishlist ----------
  function toggleWishlist(productId) {
    var product = products.find(function (p) { return p.id === productId; });
    if (!product) return;
    var idx = wishlist.findIndex(function (item) { return item.id === productId; });
    if (idx > -1) {
      wishlist.splice(idx, 1);
      showToast('Removed from wishlist', 'bi-heart');
    } else {
      wishlist.push({ id: product.id, name: product.name, price: product.price, img: product.img, category: product.category, rating: product.rating });
      showToast(product.name + ' added to wishlist', 'bi-heart-fill');
    }
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistButtons();
    renderWishlistDrawer();
  }
  function removeFromWishlist(productId) {
    wishlist = wishlist.filter(function (item) { return item.id !== productId; });
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistButtons();
    renderWishlistDrawer();
  }
  function updateWishlistCount() {
    document.querySelectorAll('.wishlist-count').forEach(function (el) {
      el.textContent = wishlist.length;
      el.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  }
  function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
      var id = parseInt(btn.getAttribute('data-product-id'));
      if (wishlist.find(function (i) { return i.id === id; })) {
        btn.classList.add('active');
        var icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-heart-fill';
      } else {
        btn.classList.remove('active');
        var icon = btn.querySelector('i');
        if (icon) icon.className = 'bi bi-heart';
      }
    });
  }

  // ---------- Product Buttons ----------
  function initProductButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.add-to-cart-btn');
      if (btn) {
        e.preventDefault();
        var id = parseInt(btn.getAttribute('data-product-id'));
        addToCart(id);
      }
      var wlBtn = e.target.closest('.wishlist-btn');
      if (wlBtn) {
        e.preventDefault();
        var wlId = parseInt(wlBtn.getAttribute('data-product-id'));
        toggleWishlist(wlId);
      }
    });
    updateWishlistButtons();
  }

  // ---------- Search Overlay ----------
  function initSearchOverlay() {
    var overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    document.addEventListener('click', function (e) {
      if (e.target.closest('.search-toggle')) {
        e.preventDefault();
        overlay.classList.add('active');
        var input = overlay.querySelector('input');
        if (input) input.focus();
      }
      if (e.target.closest('.search-close')) {
        overlay.classList.remove('active');
      }
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  }

  // ==========================================
  //  DRAWERS (Cart & Wishlist)
  // ==========================================
  function initDrawers() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('.cart-drawer-toggle')) {
        e.preventDefault();
        openCartDrawer();
      }
      if (e.target.closest('.wishlist-drawer-toggle')) {
        e.preventDefault();
        openWishlistDrawer();
      }
      if (e.target.closest('#cartDrawerClose') || e.target.closest('#cartDrawerOverlay')) {
        closeCartDrawer();
      }
      if (e.target.closest('#wishlistDrawerClose') || e.target.closest('#wishlistDrawerOverlay')) {
        closeWishlistDrawer();
      }
      if (e.target.closest('.drawer-continue-shopping')) {
        closeCartDrawer();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeWishlistDrawer();
      }
    });
    renderCartDrawer();
    renderWishlistDrawer();
  }

  function openCartDrawer() {
    closeWishlistDrawer();
    var drawer = document.getElementById('cartDrawer');
    var overlay = document.getElementById('cartDrawerOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }
  function closeCartDrawer() {
    var drawer = document.getElementById('cartDrawer');
    var overlay = document.getElementById('cartDrawerOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  function openWishlistDrawer() {
    closeCartDrawer();
    var drawer = document.getElementById('wishlistDrawer');
    var overlay = document.getElementById('wishlistDrawerOverlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderWishlistDrawer();
  }
  function closeWishlistDrawer() {
    var drawer = document.getElementById('wishlistDrawer');
    var overlay = document.getElementById('wishlistDrawerOverlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---------- Render Cart Drawer ----------
  function renderCartDrawer() {
    var body = document.getElementById('cartDrawerBody');
    var footer = document.getElementById('cartDrawerFooter');
    var emptyState = document.getElementById('cartDrawerEmpty');
    if (!body) return;

    if (cart.length === 0) {
      body.style.display = 'none';
      if (footer) footer.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    body.style.display = '';
    if (footer) footer.style.display = '';

    var html = '';
    cart.forEach(function (item) {
      html += '<div class="drawer-item">' +
        '<div class="drawer-item-img"><img src="' + item.img + '" alt="' + item.name + '"></div>' +
        '<div class="drawer-item-info">' +
        '<h6>' + item.name + '</h6>' +
        '<span class="drawer-item-category">' + item.category + '</span>' +
        '<span class="drawer-item-price">' + formatPrice(item.price) + '</span>' +
        '<div class="drawer-item-actions">' +
        '<div class="quantity-input">' +
        '<button onclick="window.luxeApp.updateQty(' + item.id + ',' + (item.qty - 1) + ')"><i class="bi bi-dash"></i></button>' +
        '<input type="number" value="' + item.qty + '" readonly>' +
        '<button onclick="window.luxeApp.updateQty(' + item.id + ',' + (item.qty + 1) + ')"><i class="bi bi-plus"></i></button>' +
        '</div>' +
        '<button class="drawer-item-remove" onclick="window.luxeApp.removeCart(' + item.id + ')"><i class="bi bi-trash"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>';
    });
    body.innerHTML = html;

    if (footer) {
      var subtotal = getCartTotal();
      var delivery = subtotal >= 499 ? 0 : 49;
      var gst = Math.round(subtotal * 0.05);
      var total = subtotal + delivery + gst;
      footer.innerHTML =
        '<div class="drawer-summary">' +
        '<div class="drawer-summary-row"><span>Subtotal</span><span>' + formatPrice(subtotal) + '</span></div>' +
        '<div class="drawer-summary-row"><span>Delivery</span><span>' + (delivery === 0 ? 'Free' : formatPrice(delivery)) + '</span></div>' +
        '<div class="drawer-summary-row"><span>GST (5%)</span><span>' + formatPrice(gst) + '</span></div>' +
        '<div class="drawer-summary-row drawer-total"><span>Grand Total</span><span>' + formatPrice(total) + '</span></div>' +
        '</div>' +
        '<div class="drawer-footer-btns">' +
        '<a href="checkout.html" class="btn-luxe w-100 justify-content-center" onclick="window.luxeApp.closeCartDrawer()">Checkout <i class="bi bi-arrow-right"></i></a>' +
        '<button class="btn-outline-luxe w-100 justify-content-center drawer-continue-shopping" onclick="window.luxeApp.closeCartDrawer()">Continue Shopping</button>' +
        '</div>';
    }
  }

  // ---------- Render Wishlist Drawer ----------
  function renderWishlistDrawer() {
    var body = document.getElementById('wishlistDrawerBody');
    var emptyState = document.getElementById('wishlistDrawerEmpty');
    if (!body) return;

    if (wishlist.length === 0) {
      body.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    body.style.display = '';

    var html = '';
    wishlist.forEach(function (item) {
      var starsHtml = '';
      var rating = item.rating || 4.5;
      for (var i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) starsHtml += '<i class="bi bi-star-fill"></i>';
        else if (i - rating < 1 && i - rating > 0) starsHtml += '<i class="bi bi-star-half"></i>';
        else starsHtml += '<i class="bi bi-star"></i>';
      }

      html += '<div class="drawer-item">' +
        '<div class="drawer-item-img"><img src="' + item.img + '" alt="' + item.name + '"></div>' +
        '<div class="drawer-item-info">' +
        '<span class="drawer-item-category">' + item.category + '</span>' +
        '<h6>' + item.name + '</h6>' +
        '<div class="drawer-item-rating">' + starsHtml + '</div>' +
        '<span class="drawer-item-price">' + formatPrice(item.price) + '</span>' +
        '<div class="drawer-item-actions">' +
        '<button class="btn-luxe btn-sm" onclick="window.luxeApp.moveToCart(' + item.id + ')"><i class="bi bi-bag-plus"></i> Move to Cart</button>' +
        '<button class="drawer-item-remove" onclick="window.luxeApp.removeWishlist(' + item.id + ')"><i class="bi bi-trash"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>';
    });
    body.innerHTML = html;
  }

  // ---------- Shop Filters ----------
  function initShopFilters() {
    var filterForm = document.querySelector('.filter-form');
    if (!filterForm) return;
    var checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (cb) {
      cb.addEventListener('change', applyFilters);
    });
  }
  function applyFilters() {
    var checked = [];
    document.querySelectorAll('.filter-form input[type="checkbox"]:checked').forEach(function (cb) {
      checked.push(cb.value.toLowerCase());
    });
    var cards = document.querySelectorAll('.product-card[data-category]');
    cards.forEach(function (card) {
      if (checked.length === 0 || checked.indexOf(card.getAttribute('data-category').toLowerCase()) > -1) {
        card.parentElement.style.display = '';
      } else {
        card.parentElement.style.display = 'none';
      }
    });
  }

  // ---------- Newsletter ----------
  function initNewsletterForm() {
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('.newsletter-form');
      if (!form) return;
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        showToast('Thank you for subscribing!', 'bi-envelope-check-fill');
        form.reset();
      }
    });
  }

  // ---------- Contact Form ----------
  function initContactForm() {
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('.contact-form');
      if (!form) return;
      e.preventDefault();
      showToast('Message sent successfully!', 'bi-check-circle-fill');
      form.reset();
    });
  }

  // ---------- Gallery Filter & Lightbox ----------
  function initGalleryFilter() {
    var filterBtns = document.querySelectorAll('.gallery-filter-btn');
    var items = document.querySelectorAll('.gallery-item');
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  //  CHECKOUT
  // ==========================================
  function initCheckout() {
    var checkoutSummary = document.getElementById('checkoutSummary');
    if (!checkoutSummary) return;
    renderCheckoutSummary();

    var checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!checkoutForm.checkValidity()) {
          checkoutForm.classList.add('was-validated');
          return;
        }
        var orderId = generateOrderId();
        var order = {
          id: orderId,
          items: cart.slice(),
          subtotal: getCartTotal(),
          delivery: getCartTotal() >= 499 ? 0 : 49,
          gst: Math.round(getCartTotal() * 0.05),
          total: 0,
          billing: {
            firstName: document.getElementById('billingFirstName').value,
            lastName: document.getElementById('billingLastName').value,
            email: document.getElementById('billingEmail').value,
            phone: document.getElementById('billingPhone').value,
            address: document.getElementById('billingAddress').value,
            state: document.getElementById('billingState').value,
            city: document.getElementById('billingCity').value,
            pincode: document.getElementById('billingPincode').value
          },
          payment: document.querySelector('input[name="payment"]:checked') ? document.querySelector('input[name="payment"]:checked').value : 'cod',
          notes: document.getElementById('orderNotes') ? document.getElementById('orderNotes').value : '',
          date: new Date().toISOString(),
          status: 'confirmed'
        };
        order.total = order.subtotal + order.delivery + order.gst;

        var orders = JSON.parse(localStorage.getItem('luxe_orders') || '[]');
        orders.push(order);
        localStorage.setItem('luxe_orders', JSON.stringify(orders));

        cart = [];
        saveCart();
        updateCartCount();

        showToast('Order placed successfully!', 'bi-check-circle-fill');
        setTimeout(function () {
          window.location.href = 'order-success.html?id=' + orderId;
        }, 800);
      });
    }

    var couponBtn = document.getElementById('applyCoupon');
    if (couponBtn) {
      couponBtn.addEventListener('click', function () {
        var input = document.getElementById('couponInput');
        if (input && input.value.toUpperCase() === 'LUXE30') {
          showToast('Coupon applied! 30% off', 'bi-tag-fill');
          renderCheckoutSummary(0.3);
        } else {
          showToast('Invalid coupon code', 'bi-exclamation-circle');
        }
      });
    }
  }

  function renderCheckoutSummary(discount) {
    var summary = document.getElementById('checkoutSummary');
    if (!summary) return;
    var subtotal = getCartTotal();
    var delivery = subtotal >= 499 ? 0 : 49;
    var gst = Math.round(subtotal * 0.05);
    var discountAmount = discount ? Math.round(subtotal * discount) : 0;
    var total = subtotal + delivery + gst - discountAmount;

    var itemsHtml = '';
    cart.forEach(function (item) {
      itemsHtml += '<div class="checkout-item">' +
        '<img src="' + item.img + '" alt="' + item.name + '">' +
        '<div class="checkout-item-info">' +
        '<h6>' + item.name + '</h6>' +
        '<span>' + item.qty + ' x ' + formatPrice(item.price) + '</span>' +
        '</div>' +
        '<span class="checkout-item-total">' + formatPrice(item.price * item.qty) + '</span>' +
        '</div>';
    });

    summary.innerHTML = itemsHtml +
      '<div class="checkout-totals">' +
      '<div class="d-flex justify-content-between mb-2"><span>Subtotal</span><span>' + formatPrice(subtotal) + '</span></div>' +
      '<div class="d-flex justify-content-between mb-2"><span>Delivery</span><span>' + (delivery === 0 ? 'Free' : formatPrice(delivery)) + '</span></div>' +
      '<div class="d-flex justify-content-between mb-2"><span>GST (5%)</span><span>' + formatPrice(gst) + '</span></div>' +
      (discountAmount > 0 ? '<div class="d-flex justify-content-between mb-2 text-success"><span>Discount (30%)</span><span>-' + formatPrice(discountAmount) + '</span></div>' : '') +
      '<hr><div class="d-flex justify-content-between fw-bold fs-5"><span>Grand Total</span><span class="text-primary">' + formatPrice(total) + '</span></div>' +
      '</div>';

    var grandTotalEl = document.getElementById('checkoutGrandTotal');
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);
  }

  // ==========================================
  //  AUTH (Firebase-ready API)
  // ==========================================
  function getCurrentUser() {
    var user = localStorage.getItem('luxe_current_user');
    return user ? JSON.parse(user) : null;
  }
  function isAuthenticated() {
    return getCurrentUser() !== null;
  }
  function loginUser(email, password) {
    var users = JSON.parse(localStorage.getItem('luxe_users') || '[]');
    var user = users.find(function (u) { return u.email === email && u.password === password; });
    if (user) {
      var safeUser = { id: user.id, name: user.name, email: user.email, phone: user.phone || '', address: user.address || '', photoURL: user.photoURL || '' };
      localStorage.setItem('luxe_current_user', JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password' };
  }
  function registerUser(name, email, password) {
    var users = JSON.parse(localStorage.getItem('luxe_users') || '[]');
    if (users.find(function (u) { return u.email === email; })) {
      return { success: false, error: 'Email already registered' };
    }
    var newUser = { id: 'user_' + Date.now(), name: name, email: email, password: password, phone: '', address: '', photoURL: '', createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('luxe_users', JSON.stringify(users));
    var safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: '', address: '', photoURL: '' };
    localStorage.setItem('luxe_current_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  }
  function logoutUser() {
    localStorage.removeItem('luxe_current_user');
    updateAuthUI();
    showToast('Logged out successfully', 'bi-box-arrow-right');
    var page = getCurrentPage();
    if (page === 'profile.html' || page === 'checkout.html') {
      window.location.href = 'login.html';
    }
  }
  function updateProfile(data) {
    var user = getCurrentUser();
    if (!user) return false;
    Object.assign(user, data);
    localStorage.setItem('luxe_current_user', JSON.stringify(user));
    var users = JSON.parse(localStorage.getItem('luxe_users') || '[]');
    var idx = users.findIndex(function (u) { return u.id === user.id; });
    if (idx > -1) {
      Object.assign(users[idx], data);
      localStorage.setItem('luxe_users', JSON.stringify(users));
    }
    return true;
  }

  // ---------- Auth UI ----------
  function updateAuthUI() {
    var authSection = document.getElementById('authSection');
    var authMobile = document.getElementById('authSectionMobile');
    var user = getCurrentUser();
    var headerLogin = document.querySelector('.login-btn');
    var headerRegister = document.querySelector('.register-btn');

    if (user) {
      if (headerLogin) headerLogin.style.display = 'none';
      if (headerRegister) headerRegister.style.display = 'none';
    } else {
      if (headerLogin) headerLogin.style.display = '';
      if (headerRegister) headerRegister.style.display = '';
    }

    if (authSection) {
      if (user) {
        var initials = user.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().substring(0, 2);
        authSection.innerHTML =
          '<div class="auth-dropdown">' +
          '<button class="auth-avatar-btn">' +
          (user.photoURL ? '<img src="' + user.photoURL + '" alt="Profile">' : '<span class="auth-initials">' + initials + '</span>') +
          '</button>' +
          '<div class="auth-dropdown-menu">' +
          '<div class="auth-dropdown-header">' +
          '<strong>' + user.name + '</strong>' +
          '<small class="text-muted">' + user.email + '</small>' +
          '</div>' +
          '<hr class="my-1">' +
          '<a href="profile.html" class="auth-dropdown-item"><i class="bi bi-person"></i> My Profile</a>' +
          '<a href="profile.html" class="auth-dropdown-item" data-profile-tab="orders"><i class="bi bi-bag"></i> My Orders</a>' +
          '<a href="profile.html" class="auth-dropdown-item" data-profile-tab="wishlist"><i class="bi bi-heart"></i> Wishlist</a>' +
          '<hr class="my-1">' +
          '<button class="auth-dropdown-item text-danger" onclick="window.luxeApp.logout()"><i class="bi bi-box-arrow-right"></i> Logout</button>' +
          '</div>' +
          '</div>';
      } else {
        authSection.innerHTML = '';
      }
    }

    if (authMobile) {
      if (user) {
        var mobileLogin = document.querySelector('#mobileMenu .btn-dark');
        var mobileRegister = document.querySelector('#mobileMenu .register-btn');
        if (mobileLogin) mobileLogin.style.display = 'none';
        if (mobileRegister) mobileRegister.style.display = 'none';
        authMobile.innerHTML =
          '<div class="mb-2"><strong>' + user.name + '</strong><br><small class="text-muted">' + user.email + '</small></div>' +
          '<a href="profile.html" class="btn btn-outline-secondary w-100 mb-2">My Profile</a>' +
          '<button class="btn btn-danger w-100" onclick="window.luxeApp.logout()">Logout</button>';
      } else {
        var mobileLogin2 = document.querySelector('#mobileMenu .btn-dark');
        var mobileRegister2 = document.querySelector('#mobileMenu .register-btn');
        if (mobileLogin2) mobileLogin2.style.display = '';
        if (mobileRegister2) mobileRegister2.style.display = '';
        authMobile.innerHTML = '';
      }
    }
  }

  // ---------- Auth Pages ----------
  function initAuthPages() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!loginForm.checkValidity()) {
          loginForm.classList.add('was-validated');
          return;
        }
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
        var result = loginUser(email, password);
        if (result.success) {
          showToast('Welcome back, ' + result.user.name + '!', 'bi-check-circle-fill');
          setTimeout(function () { window.location.href = 'index.html'; }, 800);
        } else {
          showToast(result.error, 'bi-exclamation-circle');
        }
      });
    }

    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!registerForm.checkValidity()) {
          registerForm.classList.add('was-validated');
          return;
        }
        var name = document.getElementById('regName').value;
        var email = document.getElementById('regEmail').value;
        var password = document.getElementById('regPassword').value;
        var result = registerUser(name, email, password);
        if (result.success) {
          showToast('Account created! Welcome, ' + result.user.name + '!', 'bi-check-circle-fill');
          setTimeout(function () { window.location.href = 'index.html'; }, 800);
        } else {
          showToast(result.error, 'bi-exclamation-circle');
        }
      });
    }

    var forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var successMsg = document.getElementById('forgotSuccess');
        if (successMsg) successMsg.style.display = 'block';
        showToast('Reset link sent to your email!', 'bi-envelope-check-fill');
      });
    }

    if (getCurrentPage() === 'profile.html' && !isAuthenticated()) {
      window.location.href = 'login.html';
    }
  }

  // ---------- Profile Page ----------
  function initProfilePage() {
    var profilePage = document.getElementById('profilePage');
    if (!profilePage) return;

    var user = getCurrentUser();
    if (!user) return;

    var initials = user.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().substring(0, 2);
    var photoEl = document.getElementById('profilePhoto');
    if (photoEl) {
      if (user.photoURL) {
        photoEl.innerHTML = '<img src="' + user.photoURL + '" alt="Profile">';
      } else {
        photoEl.innerHTML = '<span class="auth-initials-lg">' + initials + '</span>';
      }
    }

    var nameEl = document.getElementById('profileName');
    if (nameEl) nameEl.textContent = user.name;
    var emailEl = document.getElementById('profileEmail');
    if (emailEl) emailEl.textContent = user.email;

    var editName = document.getElementById('editName');
    if (editName) editName.value = user.name || '';
    var editEmail = document.getElementById('editEmail');
    if (editEmail) editEmail.value = user.email || '';
    var editPhone = document.getElementById('editPhone');
    if (editPhone) editPhone.value = user.phone || '';
    var editAddress = document.getElementById('editAddress');
    if (editAddress) editAddress.value = user.address || '';

    var profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        updateProfile({
          name: document.getElementById('editName').value,
          phone: document.getElementById('editPhone').value,
          address: document.getElementById('editAddress').value
        });
        updateAuthUI();
        var nameEl2 = document.getElementById('profileName');
        if (nameEl2) nameEl2.textContent = document.getElementById('editName').value;
        showToast('Profile updated!', 'bi-check-circle-fill');
      });
    }

    var ordersList = document.getElementById('ordersList');
    if (ordersList) {
      var orders = JSON.parse(localStorage.getItem('luxe_orders') || '[]');
      if (orders.length === 0) {
        ordersList.innerHTML = '<div class="empty-state"><i class="bi bi-bag" style="font-size:3rem;color:var(--primary);opacity:0.5"></i><h5 class="mt-3">No orders yet</h5><p class="text-muted">Start shopping to see your orders here.</p><a href="shop.html" class="btn-luxe">Start Shopping</a></div>';
      } else {
        var html = '';
        orders.reverse().forEach(function (order) {
          html += '<div class="order-card">' +
            '<div class="d-flex justify-content-between align-items-center mb-2">' +
            '<span class="fw-bold">' + order.id + '</span>' +
            '<span class="badge bg-success">' + (order.status || 'Confirmed') + '</span>' +
            '</div>' +
            '<small class="text-muted">' + new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + '</small>' +
            '<div class="mt-2">';
          order.items.forEach(function (item) {
            html += '<div class="d-flex align-items-center gap-2 mb-1"><img src="' + item.img + '" style="width:32px;height:32px;border-radius:6px;object-fit:cover"><span style="font-size:0.85rem">' + item.name + ' x' + item.qty + '</span></div>';
          });
          html += '</div>' +
            '<div class="d-flex justify-content-between mt-2 pt-2" style="border-top:1px solid var(--light-gray)">' +
            '<span class="text-muted">' + order.items.length + ' item(s)</span>' +
            '<span class="fw-bold text-primary">' + formatPrice(order.total) + '</span>' +
            '</div>' +
            '</div>';
        });
        ordersList.innerHTML = html;
      }
    }

    var wishlistProfile = document.getElementById('wishlistProfile');
    if (wishlistProfile) {
      var wl = JSON.parse(localStorage.getItem('luxe_wishlist') || '[]');
      if (wl.length === 0) {
        wishlistProfile.innerHTML = '<div class="empty-state"><i class="bi bi-heart" style="font-size:3rem;color:var(--primary);opacity:0.5"></i><h5 class="mt-3">Your wishlist is empty</h5><p class="text-muted">Save items you love for later.</p><a href="shop.html" class="btn-luxe">Explore Products</a></div>';
      } else {
        var wlHtml = '<div class="row g-3">';
        wl.forEach(function (item) {
          wlHtml += '<div class="col-sm-6 col-lg-4"><div class="wishlist-card">' +
            '<img src="' + item.img + '" alt="' + item.name + '" class="wishlist-img mb-2">' +
            '<p class="text-primary mb-1" style="font-size:0.75rem;text-transform:uppercase;letter-spacing:1px">' + item.category + '</p>' +
            '<h6>' + item.name + '</h6>' +
            '<p class="fw-bold text-primary mb-2">' + formatPrice(item.price) + '</p>' +
            '<button class="btn-luxe btn-sm" onclick="window.luxeApp.moveToCart(' + item.id + ')"><i class="bi bi-bag-plus"></i> Move to Cart</button>' +
            '</div></div>';
        });
        wlHtml += '</div>';
        wishlistProfile.innerHTML = wlHtml;
      }
    }

    document.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-profile-tab]');
      if (tab) {
        e.preventDefault();
        var target = tab.getAttribute('data-profile-tab');
        document.querySelectorAll('.profile-tab').forEach(function (t) { t.style.display = 'none'; });
        document.querySelectorAll('.profile-sidebar-link').forEach(function (l) { l.classList.remove('active'); });
        tab.classList.add('active');
        var targetEl = document.getElementById('profile-' + target);
        if (targetEl) targetEl.style.display = '';
      }
    });
  }

  // ==========================================
  //  PUBLIC API
  // ==========================================
  window.luxeApp = {
    addToCart: addToCart,
    removeCart: function (id) { removeFromCart(id); renderCartDrawer(); },
    updateQty: function (id, qty) { updateCartQty(id, qty); },
    toggleWishlist: toggleWishlist,
    removeWishlist: function (id) { removeFromWishlist(id); },
    moveToCart: function (id) {
      addToCart(id);
      removeFromWishlist(id);
      showToast('Moved to cart', 'bi-bag-check-fill');
    },
    openCartDrawer: openCartDrawer,
    closeCartDrawer: closeCartDrawer,
    openWishlistDrawer: openWishlistDrawer,
    closeWishlistDrawer: closeWishlistDrawer,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    getCurrentUser: getCurrentUser,
    isAuthenticated: isAuthenticated,
    updateProfile: updateProfile,
    formatPrice: formatPrice,
    getProducts: function () { return products; },
    getCart: function () { return cart; },
    getWishlist: function () { return wishlist; }
  };
})();
