const products = [
  {
    id: 1,
    name: "Creatina Monohidratada",
    category: "mass",
    price: 64.00,
    image: "https://picsum.photos/seed/creatina-monohidratada/300/300",
    skus: [
      { title: "300g", price: 64.00 },
      { title: "500g", price: 99.00 }
    ]
  },
  {
    id: 2,
    name: "Pré Treino Insano",
    category: "energy",
    price: 79.90,
    image: "https://picsum.photos/seed/pre-treino-insano/300/300",
    skus: []
  },
  {
    id: 3,
    name: "Whey Protein Concentrado",
    category: "mass",
    price: 89.90,
    image: "https://picsum.photos/seed/whey-protein-concentrado/300/300",
    skus: [
      { title: "907g", price: 89.90 },
      { title: "1.8kg", price: 159.90 }
    ]
  },
  {
    id: 4,
    name: "BCAA 2044mg",
    category: "mass",
    price: 45.00,
    image: "https://picsum.photos/seed/bcaa-2044mg/300/300",
    skus: []
  },
  {
    id: 5,
    name: "Multivitamínico",
    category: "health",
    price: 39.90,
    image: "https://picsum.photos/seed/multivitaminico/300/300",
    skus: []
  },
  {
    id: 6,
    name: "Ômega 3",
    category: "health",
    price: 55.00,
    image: "https://picsum.photos/seed/omega-3/300/300",
    skus: []
  },
  {
    id: 7,
    name: "Colágeno Hidrolisado",
    category: "health",
    price: 68.00,
    image: "https://picsum.photos/seed/colageno-hidrolisado/300/300",
    skus: [
      { title: "300g", price: 68.00 }
    ]
  },
  {
    id: 8,
    name: "Maca Peruana",
    category: "energy",
    price: 49.90,
    image: "https://picsum.photos/seed/maca-peruana/300/300",
    skus: []
  }
];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const count = document.getElementById("count");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let activeCategory = "all";
let searchTerm = "";
let cartData = [];

/* =======================
   RENDER PRODUTOS
======================= */
function render() {
  const filtered = products.filter(p =>
    (activeCategory === "all" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm)
  );

  grid.innerHTML = "";

  if (filtered.length === 0) {
    count.style.display = "none";
    grid.innerHTML = `
      <div class="not-found">
        <h3>Nenhum produto encontrado</h3>
        <p>Tente usar termos diferentes ou limpar os filtros</p>
      </div>
    `;
    return;
  }

  count.style.display = "block";
  count.textContent = `${filtered.length} produto${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`;

  filtered.forEach(p => {
    const quantityInCart = getCartQuantity(p.id);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>R$ ${p.price.toFixed(2)}</p>
        <button onclick="addToCart(${p.id})">
          ${quantityInCart > 0 ? `✔ No carrinho (${quantityInCart})` : "Adicionar ao Carrinho"}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* =======================
   CARRINHO
======================= */
function getCartQuantity(productId) {
  const item = cartData.find(i => i.product.id === productId);
  return item ? item.quantity : 0;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const cartItem = cartData.find(item => item.product.id === id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cartData.push({ product, quantity: 1 });
  }

  renderCart();
  render();
}

function removeFromCart(index) {
  cartData.splice(index, 1);
  renderCart();
  render();
}

function updateQuantity(index, change) {
  cartData[index].quantity += change;

  if (cartData[index].quantity <= 0) {
    cartData.splice(index, 1);
  }

  renderCart();
  render();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cartData.forEach((item, index) => {
    const { product, quantity } = item;
    const subtotal = product.price * quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${product.image}">
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <p>
          R$ ${product.price.toFixed(2)} <br>
          <small>Subtotal: R$ ${subtotal.toFixed(2)}</small>
        </p>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <span>${quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">+</button>
      </div>
      <button style="margin-left: 10px;" class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
    `;

    cartItems.appendChild(cartItem);
    total += subtotal;
    totalItems += quantity;
  });

  cartCount.textContent = totalItems;
  cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}

/* =======================
   EVENTOS
======================= */
cartIcon.addEventListener("click", () => cart.classList.remove("hidden"));
closeCart.addEventListener("click", () => cart.classList.add("hidden"));

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value.toLowerCase();
  render();
});

document.querySelectorAll(".categories button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".categories .active")?.classList.remove("active");
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    render();
  });
});

checkoutBtn.addEventListener("click", () => {
  if (cartData.length === 0) return;

  const message = cartData
    .map(item => `${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2)}`)
    .join("\n");

  const total = cartData.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const number = getWhatsAppNumber();

  const url = `https://wa.me/${number}?text=${encodeURIComponent(
    `Olá! Gostaria de fazer o pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`
  )}`;

  window.open(url, "_blank");
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  setWhatsAppLink();
  render();
});

function getWhatsAppNumber() {
  const whatsappNumbers = {
    morning: "557996760454", // Manhã: 6h às 11:59h
    afternoon: "557981057602", // Tarde: 12h às 17:59h
    night: "557981344583" // Noite: 18h às 5:59h
  };

  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return whatsappNumbers.morning;
  } else if (hour >= 12 && hour < 18) {
    return whatsappNumbers.afternoon;
  } else {
    return whatsappNumbers.night;
  }
}

function setWhatsAppLink() {
  const link = document.getElementById("whatsapp-link");
  if (link) {
    const number = getWhatsAppNumber();
    const message = encodeURIComponent("Olá! Gostaria de tirar algumas dúvidas.");
    link.href = `https://wa.me/${number}?text=${message}`;
  }
}