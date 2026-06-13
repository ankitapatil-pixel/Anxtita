/**
 * AURA - E-Commerce Authentication and Order Manager
 */

const STORAGE_KEYS = {
  USERS: "aura_users",
  CURRENT_USER: "aura_current_user",
  ORDERS: "aura_orders"
};

// Seed default users in localStorage if empty
function initAuth() {
  let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  
  // Check if admin/demo user exists, if not seed it
  const demoEmail = "admin@aura.com";
  const hasDemo = users.some(u => u.email === demoEmail);
  
  if (!hasDemo) {
    const demoUser = {
      name: "Alex Mercer",
      email: demoEmail,
      password: "password", // In a real app, passwords are encrypted
      address: {
        street: "742 Evergreen Terrace",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        country: "United States"
      },
      orders: [
        {
          id: "ORD-92831",
          date: "2026-05-14T10:30:00Z",
          items: [
            { id: "m3", name: "Organic Cotton Oxford Shirt", price: 95.00, quantity: 1, color: "Sky Blue", size: "M" }
          ],
          discount: 0,
          shipping: 10,
          total: 105.00,
          status: "Delivered"
        }
      ]
    };
    users.push(demoUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
}

initAuth();

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
}

function saveUser(user) {
  let users = getUsers();
  const index = users.findIndex(u => u.email === user.email);
  if (index !== -1) {
    users[index] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  
  // If current logged-in user, update session as well
  const curUser = getCurrentUser();
  if (curUser && curUser.email === user.email) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
}

function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid email or password." };
}

function register(name, email, password) {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: "An account with this email already exists." };
  }
  
  const newUser = {
    name,
    email: email.toLowerCase(),
    password,
    address: { street: "", city: "", state: "", zip: "", country: "" },
    orders: []
  };
  
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
  return { success: true, user: newUser };
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

function updateAddress(address) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: "No active session." };
  
  user.address = { ...user.address, ...address };
  saveUser(user);
  return { success: true, user };
}

function addOrder(orderItems, discount, shipping, total) {
  const user = getCurrentUser();
  
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const newOrder = {
    id: orderId,
    date: new Date().toISOString(),
    items: orderItems,
    discount,
    shipping,
    total,
    status: "Processing"
  };
  
  if (user) {
    user.orders.unshift(newOrder);
    saveUser(user);
  } else {
    // Guest checkout: save in guest orders
    let guestOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    guestOrders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(guestOrders));
  }
  
  return newOrder;
}

function getOrderHistory() {
  const user = getCurrentUser();
  if (user) {
    return user.orders;
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
}

// Export auth utilities
window.AuraAuth = {
  getCurrentUser,
  login,
  register,
  logout,
  updateAddress,
  addOrder,
  getOrderHistory,
  saveUser
};
