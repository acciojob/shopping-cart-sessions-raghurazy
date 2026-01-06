// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// --------------------
// Session Storage Helpers
// --------------------
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// --------------------
// Render Products
// --------------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;
    productList.appendChild(li);
  });
}

// --------------------
// Render Cart
// --------------------
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// --------------------
// Add to Cart
// --------------------
function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);

  cart.push(product); // duplicates allowed
  saveCart(cart);
  renderCart();
}

// --------------------
// Clear Cart
// --------------------
function clearCart() {
  saveCart([]);
  renderCart();
}

// --------------------
// Event Listeners
// --------------------
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// --------------------
// Initial Load
// --------------------
renderProducts();
renderCart();
