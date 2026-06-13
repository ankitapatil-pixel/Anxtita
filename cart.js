/**
 * AURA - E-Commerce Cart & Wishlist State Manager
 */

const CART_KEY = "aura_cart";
const WISHLIST_KEY = "aura_wishlist";

let cart = [];
let wishlist = [];

try {
  const storedCart = localStorage.getItem(CART_KEY);
  if (storedCart) cart = JSON.parse(storedCart);
} catch (e) {
  console.error("Failed to parse cart:", e);
}

try {
  const storedWishlist = localStorage.getItem(WISHLIST_KEY);
  if (storedWishlist) wishlist = JSON.parse(storedWishlist);
} catch (e) {
  console.error("Failed to parse wishlist:", e);
}

const VALID_COUPONS = {
  "WELCOME10": { type: "percent", value: 10, minSpend: 0 },
  "AURAPREMIUM20": { type: "percent", value: 20, minSpend: 8000 },
  "FREESHIP": { type: "shipping", value: 100, minSpend: 0 } // Free shipping
};

let activeCoupon = null;

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Dispatch custom event to notify components
  window.dispatchEvent(new Event("aura_cart_updated"));
}

function saveWishlist() {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new Event("aura_wishlist_updated"));
}

function getCart() {
  return cart;
}

function getWishlist() {
  return wishlist;
}

function addToCart(productId, quantity = 1, color = "", size = "") {
  const product = window.AuraProducts.getById(productId);
  if (!product) return { success: false, message: "Product not found." };

  // Set default color/size if not provided
  const chosenColor = color || (product.colors[0] ? product.colors[0].name : "");
  const chosenSize = size || (product.sizes[0] || "");

  // Find if matching item already in cart (same ID, size, and color)
  const existingItemIndex = cart.findIndex(
    item => item.id === productId && item.color === chosenColor && item.size === chosenSize
  );

  const price = product.salePrice !== null ? product.salePrice : product.price;

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: price,
      originalPrice: product.price,
      image: product.images[0],
      color: chosenColor,
      size: chosenSize,
      quantity: quantity
    });
  }

  saveCart();
  return { success: true, message: `Added ${product.name} to cart.` };
}

function removeFromCart(productId, color, size) {
  cart = cart.filter(
    item => !(item.id === productId && item.color === color && item.size === size)
  );
  saveCart();
}

function updateQuantity(productId, color, size, quantity) {
  const index = cart.findIndex(
    item => item.id === productId && item.color === color && item.size === size
  );

  if (index !== -1) {
    cart[index].quantity = Math.max(1, parseInt(quantity));
    saveCart();
  }
}

function clearCart() {
  cart = [];
  activeCoupon = null;
  saveCart();
}

// Wishlist Logic
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  let status = "";
  if (index !== -1) {
    wishlist.splice(index, 1);
    status = "removed";
  } else {
    wishlist.push(productId);
    status = "added";
  }
  saveWishlist();
  return { success: true, status, message: status === "added" ? "Added to wishlist" : "Removed from wishlist" };
}

function inWishlist(productId) {
  return wishlist.includes(productId);
}

// Pricing calculations
function applyCoupon(code) {
  const formattedCode = code.trim().toUpperCase();
  if (VALID_COUPONS.hasOwnProperty(formattedCode)) {
    const coupon = VALID_COUPONS[formattedCode];
    const subtotal = getCartSubtotal();
    
    if (subtotal >= coupon.minSpend) {
      activeCoupon = { code: formattedCode, ...coupon };
      saveCart(); // triggers refresh
      return { success: true, message: "Coupon applied successfully!" };
    } else {
      return { success: false, message: `This coupon requires a minimum spend of ₹${coupon.minSpend}.` };
    }
  }
  return { success: false, message: "Invalid coupon code." };
}

function removeCoupon() {
  activeCoupon = null;
  saveCart();
}

function getActiveCoupon() {
  return activeCoupon;
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartTotals() {
  const subtotal = getCartSubtotal();
  let discount = 0;
  let shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500; // Free shipping over ₹10,000, else ₹500 shipping
  
  if (activeCoupon) {
    if (activeCoupon.type === "percent") {
      discount = (subtotal * activeCoupon.value) / 100;
    } else if (activeCoupon.type === "shipping") {
      shipping = 0;
    }
  }
  
  const total = Math.max(0, subtotal - discount + shipping);
  
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}

// Export cart APIs
window.AuraCart = {
  get: getCart,
  getWishlist,
  add: addToCart,
  remove: removeFromCart,
  updateQuantity,
  clear: clearCart,
  toggleWishlist,
  inWishlist,
  applyCoupon,
  removeCoupon,
  getActiveCoupon,
  getTotals: getCartTotals,
  getSubtotal: getCartSubtotal
};
