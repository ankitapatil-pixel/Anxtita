/**
 * AURA - Core Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE FOR CURRENT VIEW CONFIGURATION ---
  const state = {
    currentView: "home-view",
    catalogFilters: {
      categories: [], // women, men, kids
      sizes: [],
      colors: [],
      priceMin: 0,
      priceMax: 500,
      search: "",
      sort: "featured"
    },
    activeProductDetail: null,
    selectedDetailSize: null,
    selectedDetailColor: null,
    selectedDetailQty: 1,
    selectedReviewRating: 5
  };

  function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  // --- SELECTORS ---
  const views = document.querySelectorAll(".view-section");
  const navLinks = document.querySelectorAll(".nav-link");
  const navLogo = document.getElementById("nav-logo");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mainNav = document.getElementById("main-nav");

  // Badges
  const cartBadge = document.getElementById("cart-badge");
  const wishlistBadge = document.getElementById("wishlist-badge");

  // Cart Drawer
  const cartDrawerBackdrop = document.getElementById("cart-drawer-backdrop");
  const headerCartBtn = document.getElementById("header-cart-btn");
  const cartDrawerClose = document.getElementById("cart-drawer-close");
  const cartDrawerItems = document.getElementById("cart-drawer-items");
  const cartDrawerEmpty = document.getElementById("cart-drawer-empty");
  const cartDrawerFooter = document.getElementById("cart-drawer-footer");
  const cartDrawerCount = document.getElementById("cart-drawer-count");
  const cartDrawerSubtotal = document.getElementById("cart-drawer-subtotal");
  const cartDrawerDiscountRow = document.getElementById("cart-drawer-discount-row");
  const cartDrawerDiscount = document.getElementById("cart-drawer-discount");
  const cartDrawerShipping = document.getElementById("cart-drawer-shipping");
  const cartDrawerTotal = document.getElementById("cart-drawer-total");
  const cartDrawerCheckoutBtn = document.getElementById("cart-drawer-checkout-btn");
  const cartPromoInput = document.getElementById("cart-promo-input");
  const cartPromoApplyBtn = document.getElementById("cart-promo-apply-btn");
  const cartPromoBadgeContainer = document.getElementById("cart-promo-badge-container");

  // Wishlist
  const headerWishlistBtn = document.getElementById("header-wishlist-btn");
  const wishlistProductsGrid = document.getElementById("wishlist-products-grid");
  const wishlistEmptyState = document.getElementById("wishlist-empty-state");

  // Account
  const headerAccountBtn = document.getElementById("header-account-btn");
  const profileLoggedInContainer = document.getElementById("profile-logged-in-container");
  const profileLoggedOutContainer = document.getElementById("profile-logged-out-container");
  const profileSidebarUsername = document.getElementById("profile-sidebar-username");
  const profileSidebarEmail = document.getElementById("profile-sidebar-email");
  const accountLogoutBtn = document.getElementById("account-logout-btn");
  const orderHistoryTableBody = document.getElementById("order-history-table-body");
  const ordersEmptyState = document.getElementById("orders-empty-state");
  const profileShippingForm = document.getElementById("profile-shipping-form");
  const shipStreet = document.getElementById("ship-street");
  const shipCity = document.getElementById("ship-city");
  const shipState = document.getElementById("ship-state");
  const shipZip = document.getElementById("ship-zip");
  const shipCountry = document.getElementById("ship-country");
  
  // Auth Form elements
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authLoginPanel = document.getElementById("auth-login-panel");
  const authRegisterPanel = document.getElementById("auth-register-panel");
  const switchSignupBtn = document.getElementById("switch-signup-btn");
  const switchLoginBtn = document.getElementById("switch-login-btn");

  // Product Modal (Quick View)
  const productQuickViewBackdrop = document.getElementById("product-quick-view-backdrop");
  const productModalClose = document.getElementById("product-modal-close");
  const modalProductMainImg = document.getElementById("modal-product-main-img");
  const modalGalleryDots = document.getElementById("modal-gallery-dots");
  const modalProductBadge = document.getElementById("modal-product-badge");
  const modalProductTitle = document.getElementById("modal-product-title");
  const modalRatingStars = document.getElementById("modal-rating-stars");
  const modalRatingText = document.getElementById("modal-rating-text");
  const modalProductPriceCurrent = document.getElementById("modal-product-price-current");
  const modalProductPriceOld = document.getElementById("modal-product-price-old");
  const modalProductDesc = document.getElementById("modal-product-desc");
  const modalSizeSelectorList = document.getElementById("modal-size-selector-list");
  const modalSelectedSizeLabel = document.getElementById("modal-selected-size-label");
  const modalColorSelectorList = document.getElementById("modal-color-selector-list");
  const modalSelectedColorLabel = document.getElementById("modal-selected-color-label");
  const modalQtyDec = document.getElementById("modal-qty-dec");
  const modalQtyInc = document.getElementById("modal-qty-inc");
  const modalQtyDisplay = document.getElementById("modal-qty-display");
  const modalAddToBagBtn = document.getElementById("modal-add-to-cart-btn");
  const modalWishlistToggle = document.getElementById("modal-wishlist-toggle");
  const modalReviewsCountTab = document.getElementById("modal-reviews-count-tab");
  const modalReviewsList = document.getElementById("modal-reviews-list");
  const modalWriteReviewForm = document.getElementById("modal-write-review-form");
  const reviewAuthor = document.getElementById("review-author");
  const reviewTitle = document.getElementById("review-title");
  const reviewBody = document.getElementById("review-body");
  const reviewStarsSelectContainer = document.getElementById("review-stars-select-container");

  // Checkout View
  const checkoutFormContainer = document.getElementById("checkout-form-container");
  const checkoutSuccessContainer = document.getElementById("checkout-success-container");
  const checkoutMainForm = document.getElementById("checkout-main-form");
  const checkoutSummaryItems = document.getElementById("checkout-summary-items");
  const checkoutSubtotal = document.getElementById("checkout-subtotal");
  const checkoutDiscountRow = document.getElementById("checkout-discount-row");
  const checkoutDiscount = document.getElementById("checkout-discount");
  const checkoutShipping = document.getElementById("checkout-shipping");
  const checkoutGrandTotal = document.getElementById("checkout-grand-total");
  const checkoutPromoInput = document.getElementById("checkout-promo-input");
  const checkoutPromoApplyBtn = document.getElementById("checkout-promo-apply-btn");
  const checkoutPromoBadgeContainer = document.getElementById("checkout-promo-badge-container");
  const successOrderId = document.getElementById("success-order-id");

  // --- INITIAL RENDERING & BOOTSTRAP ---
  init();

  function init() {
    setupViewRouter();
    setupHomeShowcase();
    setupCatalogPage();
    setupCartDrawer();
    setupProductModal();
    setupAuthViews();
    setupCheckoutView();
    updateBadges();
    
    // Bind all elements with navigate-shop-btn
    document.querySelectorAll(".navigate-shop-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = btn.getAttribute("data-cat");
        
        // Reset category checkboxes
        document.querySelectorAll('input[name="category"]').forEach(cb => {
          cb.checked = false;
        });
        
        if (cat && cat !== "all") {
          const cb = document.getElementById(`cat-${cat}`);
          if (cb) cb.checked = true;
          state.catalogFilters.categories = [cat];
        } else {
          state.catalogFilters.categories = [];
        }
        
        navigateTo("shop-view");
        renderCatalog();
      });
    });

    // Home Newsletter Form Submit
    const homeNewsletter = document.getElementById("home-newsletter-form");
    if (homeNewsletter) {
      homeNewsletter.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("✓ Thank you for subscribing to AURA editorials.");
        homeNewsletter.reset();
      });
    }

    const footerNewsletter = document.getElementById("footer-newsletter-form");
    if (footerNewsletter) {
      footerNewsletter.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("✓ Registered for private sales alerts.");
        footerNewsletter.reset();
      });
    }
  }

  // --- ROUTING ENGINE ---
  function setupViewRouter() {
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-target");
        const category = link.getAttribute("data-cat");
        
        if (category) {
          document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.checked = false;
          });
          if (category !== "all") {
            const cb = document.getElementById(`cat-${category}`);
            if (cb) cb.checked = true;
            state.catalogFilters.categories = [category];
          } else {
            state.catalogFilters.categories = [];
          }
          renderCatalog();
        }
        
        navigateTo(targetView);
        
        // Close mobile nav on click
        mainNav.classList.remove("active");
      });
    });

    navLogo.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("home-view");
    });

    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  function navigateTo(viewId) {
    views.forEach(v => {
      v.classList.remove("active");
      if (v.id === viewId) {
        v.classList.add("active");
      }
    });

    // Sync header tabs styling
    navLinks.forEach(link => {
      link.classList.remove("active");
      const target = link.getAttribute("data-target");
      const cat = link.getAttribute("data-cat");
      
      if (viewId === "shop-view" && cat) {
        const activeCat = state.catalogFilters.categories.length === 1 ? state.catalogFilters.categories[0] : "all";
        if (cat === activeCat) link.classList.add("active");
      } else if (target === viewId && !cat) {
        link.classList.add("active");
      }
    });

    state.currentView = viewId;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Custom view actions
    if (viewId === "wishlist-view") {
      renderWishlist();
    } else if (viewId === "account-view") {
      renderAccountDashboard();
    } else if (viewId === "checkout-view") {
      renderCheckoutReview();
    }
  }

  // --- HOMEPAGE SHOWCASE LOGIC ---
  function setupHomeShowcase() {
    const tabBtns = document.querySelectorAll(".home-tag-btn");
    
    // Initial display
    renderHomeShowcase("New Arrivals");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const selectedTag = btn.getAttribute("data-tag");
        renderHomeShowcase(selectedTag);
      });
    });
  }

  function renderHomeShowcase(tagName) {
    const grid = document.getElementById("home-showcase-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    // Get products with matching tag
    const filtered = window.AuraProducts.getByTag(tagName).slice(0, 4);
    
    filtered.forEach(p => {
      const card = createProductCardHtml(p);
      grid.appendChild(card);
    });
  }

  // --- CATALOG MANAGEMENT ---
  function setupCatalogPage() {
    // Checkbox category filtering
    const catCheckboxes = document.querySelectorAll('input[name="category"]');
    catCheckboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        const active = [];
        catCheckboxes.forEach(c => {
          if (c.checked) active.push(c.value);
        });
        state.catalogFilters.categories = active;
        renderCatalog();
      });
    });

    // Size tiles multi-filtering
    const sizeTiles = document.querySelectorAll("#size-filter-options .size-tile");
    sizeTiles.forEach(tile => {
      tile.addEventListener("click", () => {
        tile.classList.toggle("active");
        const val = tile.getAttribute("data-size");
        const idx = state.catalogFilters.sizes.indexOf(val);
        if (idx !== -1) {
          state.catalogFilters.sizes.splice(idx, 1);
        } else {
          state.catalogFilters.sizes.push(val);
        }
        renderCatalog();
      });
    });

    // Price controls
    const priceApplyBtn = document.getElementById("apply-price-filter-btn");
    if (priceApplyBtn) {
      priceApplyBtn.addEventListener("click", () => {
        const minVal = parseFloat(document.getElementById("price-min").value) || 0;
        const maxVal = parseFloat(document.getElementById("price-max").value) || 500;
        state.catalogFilters.priceMin = minVal;
        state.catalogFilters.priceMax = maxVal;
        renderCatalog();
      });
    }

    // Reset filters
    const resetFiltersBtn = document.getElementById("reset-filters-btn");
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        state.catalogFilters = {
          categories: [],
          sizes: [],
          colors: [],
          priceMin: 0,
          priceMax: 500,
          search: "",
          sort: "featured"
        };
        
        // Reset controls visual
        catCheckboxes.forEach(c => c.checked = false);
        sizeTiles.forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
        document.getElementById("price-min").value = 0;
        document.getElementById("price-max").value = 500;
        document.getElementById("catalog-search").value = "";
        document.getElementById("catalog-sort").value = "featured";
        
        renderCatalog();
      });
    }

    // Sort select
    const sortSelect = document.getElementById("catalog-sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.catalogFilters.sort = sortSelect.value;
        renderCatalog();
      });
    }

    // Search bar
    const searchInput = document.getElementById("catalog-search");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.catalogFilters.search = searchInput.value.trim().toLowerCase();
        renderCatalog();
      });
    }

    // Initial render setup for color filters swatches list
    renderColorFilterSwatches();
    renderCatalog();
  }

  function renderColorFilterSwatches() {
    const list = document.getElementById("color-filter-options");
    if (!list) return;
    list.innerHTML = "";
    
    // Extract unique colors across all items
    const colorsMap = {};
    window.AuraProducts.list.forEach(p => {
      p.colors.forEach(c => {
        colorsMap[c.name] = c.hex;
      });
    });

    Object.keys(colorsMap).forEach(name => {
      const hex = colorsMap[name];
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = hex;
      swatch.title = name;
      swatch.setAttribute("data-color", name);
      
      swatch.addEventListener("click", () => {
        swatch.classList.toggle("active");
        const idx = state.catalogFilters.colors.indexOf(name);
        if (idx !== -1) {
          state.catalogFilters.colors.splice(idx, 1);
        } else {
          state.catalogFilters.colors.push(name);
        }
        renderCatalog();
      });
      
      list.appendChild(swatch);
    });
  }

  function renderCatalog() {
    const grid = document.getElementById("catalog-products-grid");
    const emptyState = document.getElementById("catalog-empty-state");
    const activeFiltersBar = document.getElementById("active-filter-tags");
    if (!grid) return;

    grid.innerHTML = "";
    activeFiltersBar.innerHTML = "";

    // Apply filters on dataset
    let filtered = [...window.AuraProducts.list];
    const f = state.catalogFilters;

    // Categories
    if (f.categories.length > 0) {
      filtered = filtered.filter(p => f.categories.includes(p.category.toLowerCase()));
      
      f.categories.forEach(cat => {
        createFilterBadge(cat.toUpperCase(), () => {
          document.getElementById(`cat-${cat}`).checked = false;
          f.categories = f.categories.filter(c => c !== cat);
          renderCatalog();
        });
      });
    }

    // Sizes
    if (f.sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => f.sizes.includes(s)));
      
      f.sizes.forEach(size => {
        createFilterBadge(size, () => {
          document.querySelector(`#size-filter-options .size-tile[data-size="${size}"]`).classList.remove("active");
          f.sizes = f.sizes.filter(s => s !== size);
          renderCatalog();
        });
      });
    }

    // Colors
    if (f.colors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => f.colors.includes(c.name)));
      
      f.colors.forEach(col => {
        createFilterBadge(col, () => {
          document.querySelector(`.color-swatch[data-color="${col}"]`).classList.remove("active");
          f.colors = f.colors.filter(c => c !== col);
          renderCatalog();
        });
      });
    }

    // Price range
    if (f.priceMin > 0 || f.priceMax < 500) {
      filtered = filtered.filter(p => {
        const price = p.salePrice !== null ? p.salePrice : p.price;
        return price >= f.priceMin && price <= f.priceMax;
      });
      
      if (f.priceMin > 0 || f.priceMax < 500) {
        createFilterBadge(`$${f.priceMin} - $${f.priceMax}`, () => {
          document.getElementById("price-min").value = 0;
          document.getElementById("price-max").value = 500;
          f.priceMin = 0;
          f.priceMax = 500;
          renderCatalog();
        });
      }
    }

    // Search query
    if (f.search) {
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(f.search) || 
             p.description.toLowerCase().includes(f.search)
      );
    }

    // Sort order
    if (f.sort === "price-low") {
      filtered.sort((a, b) => {
        const priceA = a.salePrice !== null ? a.salePrice : a.price;
        const priceB = b.salePrice !== null ? b.salePrice : b.price;
        return priceA - priceB;
      });
    } else if (f.sort === "price-high") {
      filtered.sort((a, b) => {
        const priceA = a.salePrice !== null ? a.salePrice : a.price;
        const priceB = b.salePrice !== null ? b.salePrice : b.price;
        return priceB - priceA;
      });
    } else if (f.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Show empty state or render list
    if (filtered.length === 0) {
      grid.style.display = "none";
      emptyState.style.display = "block";
    } else {
      grid.style.display = "grid";
      emptyState.style.display = "none";
      
      filtered.forEach(p => {
        const card = createProductCardHtml(p);
        grid.appendChild(card);
      });
    }
  }

  function createFilterBadge(text, onRemove) {
    const activeFiltersBar = document.getElementById("active-filter-tags");
    if (!activeFiltersBar) return;
    
    const badge = document.createElement("span");
    badge.style.display = "inline-flex";
    badge.style.alignItems = "center";
    badge.style.gap = "0.5rem";
    badge.style.padding = "0.25rem 0.75rem";
    badge.style.fontSize = "0.75rem";
    badge.style.backgroundColor = "var(--white)";
    badge.style.border = "1px solid var(--border-color)";
    badge.style.fontWeight = "500";
    badge.innerHTML = `${text} <span style="cursor:pointer; color:var(--error-color); font-weight:600;">&times;</span>`;
    
    badge.querySelector("span").addEventListener("click", onRemove);
    activeFiltersBar.appendChild(badge);
  }

  // --- GENERAL DOM RENDER UTILITIES ---
  function createProductCardHtml(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    
    const isSale = product.tag === "Sale";
    const badgeHtml = product.tag ? `<div class="product-badge ${isSale ? 'sale' : ''}">${product.tag}</div>` : '';
    
    const isWish = window.AuraCart.inWishlist(product.id);
    const wishActiveHtml = isWish ? 'active' : '';
    
    const originalPrice = product.price;
    const salePrice = product.salePrice;
    
    let priceHtml = '';
    if (salePrice !== null) {
      priceHtml = `<span class="sale-price">${formatINR(salePrice)}</span> <span class="old-price">${formatINR(originalPrice)}</span>`;
    } else {
      priceHtml = `<span>${formatINR(originalPrice)}</span>`;
    }

    // Secondary back-image support
    const imgBack = product.images[1] ? product.images[1] : product.images[0];

    card.innerHTML = `
      <div class="product-image-wrapper">
        ${badgeHtml}
        <button class="product-wishlist-btn ${wishActiveHtml}" data-id="${product.id}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img class="product-card-img" src="${product.images[0]}" alt="${product.name}">
        <img class="product-card-img back-img" src="${imgBack}" alt="${product.name}">
        <button class="product-card-action quick-view-btn" data-id="${product.id}">Quick View</button>
      </div>
      <div class="product-info">
        <span class="product-category-name">${product.category}</span>
        <h3 class="product-name open-detail" data-id="${product.id}">${product.name}</h3>
        <div class="product-rating">
          <span>${"★".repeat(Math.round(product.rating))}${"☆".repeat(5 - Math.round(product.rating))}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-price-row">
          ${priceHtml}
        </div>
        <button class="btn btn-secondary btn-small btn-full product-card-add-btn" data-id="${product.id}" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.75rem; letter-spacing: 0.05em;">Add to Bag</button>
      </div>
    `;

    // Hook events
    card.querySelector(".product-wishlist-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const res = window.AuraCart.toggleWishlist(product.id);
      const btn = e.currentTarget;
      if (res.status === "added") {
        btn.classList.add("active");
        showToast("✓ Added to Wishlist");
      } else {
        btn.classList.remove("active");
        showToast("Removed from Wishlist");
      }
      updateBadges();
      if (state.currentView === "wishlist-view") renderWishlist();
    });

    const triggerOpen = (e) => {
      e.preventDefault();
      openQuickViewModal(product.id);
    };

    card.querySelector(".quick-view-btn").addEventListener("click", triggerOpen);
    card.querySelector(".open-detail").addEventListener("click", triggerOpen);

    card.querySelector(".product-card-add-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const defaultSize = product.sizes[0] || "M";
      const defaultColor = product.colors[0] ? product.colors[0].name : "Standard";
      
      const res = window.AuraCart.add(
        product.id,
        1,
        defaultColor,
        defaultSize
      );
      
      if (res.success) {
        showToast(`✓ Added ${product.name} to Bag`);
        openCartDrawer();
      }
    });

    return card;
  }  // --- WISHLIST RENDER ---
  function renderWishlist() {
    const list = window.AuraCart.getWishlist();
    const grid = document.getElementById("wishlist-products-grid");
    if (!grid) return;

    grid.innerHTML = "";

    if (list.length === 0) {
      grid.style.display = "none";
      wishlistEmptyState.style.display = "block";
    } else {
      grid.style.display = "grid";
      wishlistEmptyState.style.display = "none";
      
      list.forEach(id => {
        const product = window.AuraProducts.getById(id);
        if (product) {
          const card = createProductCardHtml(product);
          grid.appendChild(card);
        }
      });
    }
  }

  // --- PRODUCT DETAIL MODAL ---
  function setupProductModal() {
    productModalClose.addEventListener("click", closeQuickViewModal);
    productQuickViewBackdrop.addEventListener("click", (e) => {
      if (e.target === productQuickViewBackdrop) closeQuickViewModal();
    });

    // Quantity modifiers
    modalQtyDec.addEventListener("click", () => {
      state.selectedDetailQty = Math.max(1, state.selectedDetailQty - 1);
      modalQtyDisplay.textContent = state.selectedDetailQty;
    });

    modalQtyInc.addEventListener("click", () => {
      state.selectedDetailQty += 1;
      modalQtyDisplay.textContent = state.selectedDetailQty;
    });

    // Add to Cart
    modalAddToBagBtn.addEventListener("click", () => {
      if (!state.activeProductDetail) return;
      
      if (!state.selectedDetailSize) {
        showToast("⚠️ Please select a sizing option.");
        return;
      }
      
      const res = window.AuraCart.add(
        state.activeProductDetail.id,
        state.selectedDetailQty,
        state.selectedDetailColor,
        state.selectedDetailSize
      );
      
      if (res.success) {
        showToast(`✓ Added to Bag`);
        closeQuickViewModal();
        openCartDrawer();
      }
    });

    // Toggle Wishlist inside details modal
    modalWishlistToggle.addEventListener("click", () => {
      if (!state.activeProductDetail) return;
      const res = window.AuraCart.toggleWishlist(state.activeProductDetail.id);
      
      if (res.status === "added") {
        modalWishlistToggle.classList.add("active");
        showToast("✓ Added to Wishlist");
      } else {
        modalWishlistToggle.classList.remove("active");
        showToast("Removed from Wishlist");
      }
      updateBadges();
      if (state.currentView === "wishlist-view") renderWishlist();
    });

    // Modal Tabs logic
    const tabBtns = document.querySelectorAll(".modal-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const tabName = btn.getAttribute("data-tab-name");
        document.querySelectorAll(".modal-tab-content").forEach(c => c.classList.remove("active"));
        document.getElementById(`modal-tab-${tabName}`).classList.add("active");
      });
    });

    // Submit review form
    modalWriteReviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (!state.activeProductDetail) return;
      
      const newReview = {
        user: reviewAuthor.value.trim(),
        rating: state.selectedReviewRating,
        title: reviewTitle.value.trim(),
        comment: reviewBody.value.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      
      // Update data in list
      state.activeProductDetail.reviews.unshift(newReview);
      state.activeProductDetail.reviewsCount += 1;
      
      // Recompute average rating
      const totalScore = state.activeProductDetail.reviews.reduce((sum, r) => sum + r.rating, 0);
      state.activeProductDetail.rating = parseFloat((totalScore / state.activeProductDetail.reviews.length).toFixed(1));
      
      // Re-render reviews tab
      renderModalReviews();
      
      // Reset review form
      modalWriteReviewForm.reset();
      resetStarSelectRating();
      
      showToast("✓ Review submitted. Thank you for your feedback.");
    });

    // Rating star selector inside review form
    const starItems = document.querySelectorAll("#review-stars-select-container .star-select-item");
    starItems.forEach(star => {
      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-val"));
        state.selectedReviewRating = val;
        
        starItems.forEach(s => {
          const sVal = parseInt(s.getAttribute("data-val"));
          if (sVal <= val) {
            s.classList.add("selected");
          } else {
            s.classList.remove("selected");
          }
        });
      });
      
      star.addEventListener("mouseover", () => {
        const val = parseInt(star.getAttribute("data-val"));
        starItems.forEach(s => {
          const sVal = parseInt(s.getAttribute("data-val"));
          if (sVal <= val) {
            s.classList.add("hovered");
          } else {
            s.classList.remove("hovered");
          }
        });
      });

      star.addEventListener("mouseout", () => {
        starItems.forEach(s => s.classList.remove("hovered"));
      });
    });
  }

  function resetStarSelectRating() {
    state.selectedReviewRating = 5;
    const starItems = document.querySelectorAll("#review-stars-select-container .star-select-item");
    starItems.forEach(s => s.classList.add("selected"));
  }

  function openQuickViewModal(productId) {
    const product = window.AuraProducts.getById(productId);
    if (!product) return;

    state.activeProductDetail = product;
    state.selectedDetailQty = 1;
    state.selectedDetailSize = product.sizes[0] || null;
    state.selectedDetailColor = product.colors[0] ? product.colors[0].name : null;
    
    // Set text fields
    modalProductTitle.textContent = product.name;
    modalProductDesc.textContent = product.description;
    modalProductBadge.textContent = product.tag ? product.tag : "Essential";
    modalProductBadge.style.backgroundColor = product.tag === "Sale" ? "var(--error-color)" : "var(--text-color)";
    
    // Current prices
    if (product.salePrice !== null) {
      modalProductPriceCurrent.textContent = `$${product.salePrice.toFixed(2)}`;
      modalProductPriceOld.textContent = `$${product.price.toFixed(2)}`;
      modalProductPriceOld.style.display = "inline";
    } else {
      modalProductPriceCurrent.textContent = `$${product.price.toFixed(2)}`;
      modalProductPriceOld.style.display = "none";
    }

    // Rating average
    modalRatingStars.textContent = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));
    modalRatingText.textContent = `${product.rating} (${product.reviewsCount} reviews)`;

    // Main Image
    modalProductMainImg.src = product.images[0];
    
    // Gallery Dot navigations
    modalGalleryDots.innerHTML = "";
    product.images.forEach((img, i) => {
      const dot = document.createElement("div");
      dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener("click", () => {
        document.querySelectorAll(".gallery-dot").forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
        modalProductMainImg.src = img;
      });
      modalGalleryDots.appendChild(dot);
    });

    // Sizing choices list
    modalSizeSelectorList.innerHTML = "";
    modalSelectedSizeLabel.textContent = state.selectedDetailSize || "Select Size";
    product.sizes.forEach((size, idx) => {
      const btn = document.createElement("button");
      btn.className = `size-select-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = size;
      
      btn.addEventListener("click", () => {
        document.querySelectorAll(".size-select-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedDetailSize = size;
        modalSelectedSizeLabel.textContent = size;
      });
      
      modalSizeSelectorList.appendChild(btn);
    });

    // Color Swatches choices list
    modalColorSelectorList.innerHTML = "";
    modalSelectedColorLabel.textContent = state.selectedDetailColor || "";
    product.colors.forEach(col => {
      const swatch = document.createElement("div");
      swatch.className = `color-swatch ${col.name === state.selectedDetailColor ? 'active' : ''}`;
      swatch.style.backgroundColor = col.hex;
      swatch.title = col.name;
      
      swatch.addEventListener("click", () => {
        document.querySelectorAll("#modal-color-selector-list .color-swatch").forEach(s => s.classList.remove("active"));
        swatch.classList.add("active");
        state.selectedDetailColor = col.name;
        modalSelectedColorLabel.textContent = col.name;
      });
      
      modalColorSelectorList.appendChild(swatch);
    });

    // Wishlist active configuration
    const isWish = window.AuraCart.inWishlist(product.id);
    if (isWish) {
      modalWishlistToggle.classList.add("active");
    } else {
      modalWishlistToggle.classList.remove("active");
    }

    // Default review values
    modalQtyDisplay.textContent = "1";
    resetStarSelectRating();

    // Default tabs to info tab
    document.querySelectorAll(".modal-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelector('.modal-tab-btn[data-tab-name="info-tab"]').classList.add("active");
    document.querySelectorAll(".modal-tab-content").forEach(c => c.classList.remove("active"));
    document.getElementById("modal-tab-info-tab").classList.add("active");

    // Load reviews
    renderModalReviews();

    // Open backdrop animation
    productQuickViewBackdrop.classList.add("active");
    document.body.style.overflow = "hidden"; // disable body scroll
  }

  function closeQuickViewModal() {
    productQuickViewBackdrop.classList.remove("active");
    document.body.style.overflow = ""; // restore body scroll
    state.activeProductDetail = null;
  }

  function renderModalReviews() {
    if (!state.activeProductDetail) return;
    
    modalReviewsCountTab.textContent = state.activeProductDetail.reviews.length;
    modalReviewsList.innerHTML = "";
    
    if (state.activeProductDetail.reviews.length === 0) {
      modalReviewsList.innerHTML = `<p class="text-muted" style="font-size:0.85rem; padding: 1rem 0;">No reviews written for this garment yet.</p>`;
    } else {
      state.activeProductDetail.reviews.forEach(rev => {
        const item = document.createElement("div");
        item.className = "review-item";
        item.innerHTML = `
          <div class="review-header">
            <span class="review-user">${rev.user}</span>
            <span class="review-date">${rev.date}</span>
          </div>
          <div style="color:#ffb703; font-size:0.8rem; margin-bottom:0.25rem;">
            ${"★".repeat(rev.rating)}${"☆".repeat(5 - rev.rating)}
          </div>
          <div class="review-title">${rev.title}</div>
          <p class="review-comment">${rev.comment}</p>
        `;
        modalReviewsList.appendChild(item);
      });
    }
  }

  // --- CART DRAWER SYNC ---
  function setupCartDrawer() {
    headerCartBtn.addEventListener("click", openCartDrawer);
    cartDrawerClose.addEventListener("click", closeCartDrawer);
    cartDrawerBackdrop.addEventListener("click", (e) => {
      if (e.target === cartDrawerBackdrop) closeCartDrawer();
    });

    // Custom event update listener
    window.addEventListener("aura_cart_updated", () => {
      updateBadges();
      syncCartDrawerContents();
      if (state.currentView === "checkout-view") renderCheckoutReview();
    });

    // Apply promo coupon
    cartPromoApplyBtn.addEventListener("click", () => {
      const code = cartPromoInput.value.trim();
      if (!code) return;
      const res = window.AuraCart.applyCoupon(code);
      showToast(res.message);
      cartPromoInput.value = "";
    });

    checkoutPromoApplyBtn.addEventListener("click", () => {
      const code = checkoutPromoInput.value.trim();
      if (!code) return;
      const res = window.AuraCart.applyCoupon(code);
      showToast(res.message);
      checkoutPromoInput.value = "";
    });

    // Checkout button inside drawer redirecting
    cartDrawerCheckoutBtn.addEventListener("click", () => {
      if (window.AuraCart.get().length === 0) return;
      closeCartDrawer();
      navigateTo("checkout-view");
    });

    syncCartDrawerContents();
  }

  function openCartDrawer() {
    cartDrawerBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCartDrawer() {
    cartDrawerBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function syncCartDrawerContents() {
    const list = window.AuraCart.get();
    cartDrawerItems.innerHTML = "";
    
    // Header Count
    cartDrawerCount.textContent = list.reduce((sum, item) => sum + item.quantity, 0);

    if (list.length === 0) {
      cartDrawerItems.style.display = "none";
      cartDrawerEmpty.style.display = "block";
      cartDrawerFooter.style.display = "none";
    } else {
      cartDrawerItems.style.display = "flex";
      cartDrawerEmpty.style.display = "none";
      cartDrawerFooter.style.display = "block";

      list.forEach(item => {
        const elem = document.createElement("div");
        elem.className = "cart-item";
        elem.innerHTML = `
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <div>
              <h4 class="cart-item-title">${item.name}</h4>
              <div class="cart-item-meta">
                <span>Color: ${item.color}</span>
                <span>Size: ${item.size}</span>
              </div>
            </div>
            <div class="cart-item-qty-row">
              <button class="qty-btn dec-qty-btn">&minus;</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn inc-qty-btn">&plus;</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="cart-item-delete">Delete</button>
          </div>
        `;

        // Modifiers hooks
        elem.querySelector(".dec-qty-btn").addEventListener("click", () => {
          window.AuraCart.updateQuantity(item.id, item.color, item.size, item.quantity - 1);
        });

        elem.querySelector(".inc-qty-btn").addEventListener("click", () => {
          window.AuraCart.updateQuantity(item.id, item.color, item.size, item.quantity + 1);
        });

        elem.querySelector(".cart-item-delete").addEventListener("click", () => {
          window.AuraCart.remove(item.id, item.color, item.size);
          showToast("Item deleted from bag.");
        });

        cartDrawerItems.appendChild(elem);
      });

      // Price configurations
      const totals = window.AuraCart.getTotals();
      cartDrawerSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
      cartDrawerShipping.textContent = totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`;
      cartDrawerTotal.textContent = `$${totals.total.toFixed(2)}`;

      // Discount representation
      const activeCoupon = window.AuraCart.getActiveCoupon();
      if (activeCoupon) {
        cartDrawerDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
        cartDrawerDiscountRow.style.display = "flex";
        
        cartPromoBadgeContainer.innerHTML = `
          <div class="promo-badge">
            <span>🎟️ Coupon: ${activeCoupon.code} applied</span>
            <span class="promo-remove" id="cart-remove-coupon-btn">&times;</span>
          </div>
        `;
        
        document.getElementById("cart-remove-coupon-btn").addEventListener("click", () => {
          window.AuraCart.removeCoupon();
          showToast("Coupon removed.");
        });
      } else {
        cartDrawerDiscountRow.style.display = "none";
        cartPromoBadgeContainer.innerHTML = "";
      }
    }
  }

  function updateBadges() {
    const cartItems = window.AuraCart.get();
    const wishItems = window.AuraCart.getWishlist();
    
    // Cart Count
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? "flex" : "none";

    // Wish Count
    const wishCount = wishItems.length;
    wishlistBadge.textContent = wishCount;
    wishlistBadge.style.display = wishCount > 0 ? "flex" : "none";
  }

  // --- ACCOUNT & LOGIN HANDLERS ---
  function setupAuthViews() {
    headerAccountBtn.addEventListener("click", () => {
      navigateTo("account-view");
    });

    switchSignupBtn.addEventListener("click", () => {
      authLoginPanel.style.display = "none";
      authRegisterPanel.style.display = "block";
    });

    switchLoginBtn.addEventListener("click", () => {
      authLoginPanel.style.display = "block";
      authRegisterPanel.style.display = "none";
    });

    // Login Form Submit
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const pass = document.getElementById("login-password").value;
      
      const res = window.AuraAuth.login(email, pass);
      if (res.success) {
        showToast(`✓ Welcome back, ${res.user.name}!`);
        loginForm.reset();
        renderAccountDashboard();
      } else {
        showToast(`⚠️ ${res.message}`);
      }
    });

    // Register Form Submit
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const pass = document.getElementById("reg-password").value;
      
      const res = window.AuraAuth.register(name, email, pass);
      if (res.success) {
        showToast(`✓ Account created successfully!`);
        registerForm.reset();
        renderAccountDashboard();
      } else {
        showToast(`⚠️ ${res.message}`);
      }
    });

    // Logout Click
    accountLogoutBtn.addEventListener("click", () => {
      window.AuraAuth.logout();
      showToast("Signed out successfully.");
      renderAccountDashboard();
    });

    // Profile Address update form
    profileShippingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const address = {
        street: shipStreet.value.trim(),
        city: shipCity.value.trim(),
        state: shipState.value.trim(),
        zip: shipZip.value.trim(),
        country: shipCountry.value.trim()
      };

      const res = window.AuraAuth.updateAddress(address);
      if (res.success) {
        showToast("✓ Shipping address updated.");
      }
    });

    // Accounts tabs navigation
    document.querySelectorAll(".profile-nav-item[data-profile-tab]").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".profile-nav-item").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const tab = item.getAttribute("data-profile-tab");
        document.querySelectorAll(".profile-content-section").forEach(s => s.classList.remove("active"));
        document.getElementById(`profile-tab-${tab}`).classList.add("active");
      });
    });
  }

  function renderAccountDashboard() {
    const user = window.AuraAuth.getCurrentUser();

    if (user) {
      profileLoggedOutContainer.style.display = "none";
      profileLoggedInContainer.style.display = "grid";
      profileSidebarUsername.textContent = user.name;
      profileSidebarEmail.textContent = user.email;

      // Populate address settings fields
      shipStreet.value = user.address.street || "";
      shipCity.value = user.address.city || "";
      shipState.value = user.address.state || "";
      shipZip.value = user.address.zip || "";
      shipCountry.value = user.address.country || "";

      // Load orders table
      renderOrderHistory();
    } else {
      profileLoggedOutContainer.style.display = "block";
      profileLoggedInContainer.style.display = "none";
      authLoginPanel.style.display = "block";
      authRegisterPanel.style.display = "none";
    }
  }

  function renderOrderHistory() {
    const orders = window.AuraAuth.getOrderHistory();
    orderHistoryTableBody.innerHTML = "";

    if (orders.length === 0) {
      orderHistoryTableBody.closest("table").style.display = "none";
      ordersEmptyState.style.display = "block";
    } else {
      orderHistoryTableBody.closest("table").style.display = "table";
      ordersEmptyState.style.display = "none";

      orders.forEach(ord => {
        const dateStr = new Date(ord.date).toLocaleDateString(undefined, {
          year: 'numeric', month: 'short', day: 'numeric'
        });

        // Items listing inline summaries
        const itemsSummary = ord.items.map(it => `${it.name} (x${it.quantity})`).join(", ");

        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="font-weight:600; font-family:monospace;">${ord.id}</td>
          <td>${dateStr}</td>
          <td class="text-muted" style="max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${itemsSummary}">${itemsSummary}</td>
          <td style="font-weight:600;">$${ord.total.toFixed(2)}</td>
          <td><span class="order-status-badge ${ord.status.toLowerCase()}">${ord.status}</span></td>
        `;
        orderHistoryTableBody.appendChild(row);
      });
    }
  }

  // --- CHECKOUT SUBMISSION LOGIC ---
  function setupCheckoutView() {
    checkoutMainForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const cartItems = window.AuraCart.get();
      if (cartItems.length === 0) {
        showToast("⚠️ Your bag is empty.");
        return;
      }

      // Read form data details
      const order = {
        firstName: document.getElementById("chk-first-name").value.trim(),
        lastName: document.getElementById("chk-last-name").value.trim(),
        email: document.getElementById("chk-email").value.trim(),
        phone: document.getElementById("chk-phone").value.trim(),
        street: document.getElementById("chk-street").value.trim(),
        city: document.getElementById("chk-city").value.trim(),
        state: document.getElementById("chk-state").value.trim(),
        zip: document.getElementById("chk-zip").value.trim(),
        country: document.getElementById("chk-country").value.trim()
      };

      // Perform calculations
      const totals = window.AuraCart.getTotals();
      
      // Save order record
      const res = window.AuraAuth.addOrder(
        cartItems,
        totals.discount,
        totals.shipping,
        totals.total
      );

      // Reset cart state
      window.AuraCart.clear();

      // Show success container
      successOrderId.textContent = res.id;
      checkoutFormContainer.style.display = "none";
      checkoutSuccessContainer.style.display = "block";
      
      showToast("✓ Order placed successfully!");
    });
  }

  function renderCheckoutReview() {
    const list = window.AuraCart.get();
    checkoutSummaryItems.innerHTML = "";

    // Reset default layout
    checkoutFormContainer.style.display = "grid";
    checkoutSuccessContainer.style.display = "none";

    if (list.length === 0) {
      checkoutSummaryItems.innerHTML = `<p class="text-muted" style="padding: 2rem 0; text-align:center;">Your bag is empty. Redirecting...</p>`;
      setTimeout(() => {
        if (state.currentView === "checkout-view") navigateTo("shop-view");
      }, 1500);
      return;
    }

    list.forEach(item => {
      const elem = document.createElement("div");
      elem.className = "checkout-summary-item";
      elem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="checkout-summary-name">
          <p>${item.name}</p>
          <span>Size: ${item.size} • Color: ${item.color} • Qty: ${item.quantity}</span>
        </div>
        <div class="checkout-summary-price">$${(item.price * item.quantity).toFixed(2)}</div>
      `;
      checkoutSummaryItems.appendChild(elem);
    });

    // Pricing tallies
    const totals = window.AuraCart.getTotals();
    checkoutSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    checkoutShipping.textContent = totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`;
    checkoutGrandTotal.textContent = `$${totals.total.toFixed(2)}`;

    // Discount line items
    const activeCoupon = window.AuraCart.getActiveCoupon();
    if (activeCoupon) {
      checkoutDiscount.textContent = `-$${totals.discount.toFixed(2)}`;
      checkoutDiscountRow.style.display = "flex";
      
      checkoutPromoBadgeContainer.innerHTML = `
        <div class="promo-badge" style="margin-top: -1rem; margin-bottom: 1.5rem;">
          <span>🎟️ Coupon: ${activeCoupon.code} applied</span>
          <span class="promo-remove" id="checkout-remove-coupon-btn">&times;</span>
        </div>
      `;
      
      document.getElementById("checkout-remove-coupon-btn").addEventListener("click", () => {
        window.AuraCart.removeCoupon();
        showToast("Coupon removed.");
      });
    } else {
      checkoutDiscountRow.style.display = "none";
      checkoutPromoBadgeContainer.innerHTML = "";
    }

    // Auto-populate customer fields if logged in
    const user = window.AuraAuth.getCurrentUser();
    if (user) {
      const names = user.name.split(" ");
      document.getElementById("chk-first-name").value = names[0] || "";
      document.getElementById("chk-last-name").value = names.slice(1).join(" ") || "";
      document.getElementById("chk-email").value = user.email || "";
      
      if (user.address) {
        document.getElementById("chk-street").value = user.address.street || "";
        document.getElementById("chk-city").value = user.address.city || "";
        document.getElementById("chk-state").value = user.address.state || "";
        document.getElementById("chk-zip").value = user.address.zip || "";
        document.getElementById("chk-country").value = user.address.country || "";
      }
    }
  }

  // --- GENERAL COMPONENT HELPER UTILITIES ---
  function showToast(message) {
    const container = document.getElementById("global-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    // Fade out timer
    setTimeout(() => {
      toast.classList.add("removing");
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    }, 3000);
  }
});
