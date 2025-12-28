const products = [
  {
    id: 1,
    name: "Creatina Monohidratada",
    category: "mass",
    price: 64.00,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
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
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: []
  },
  {
    id: 3,
    name: "Whey Protein Concentrado",
    category: "mass",
    price: 89.90,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
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
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: []
  },
  {
    id: 5,
    name: "Multivitamínico",
    category: "health",
    price: 39.90,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: []
  },
  {
    id: 6,
    name: "Ômega 3",
    category: "health",
    price: 55.00,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: []
  },
  {
    id: 7,
    name: "Colágeno Hidrolisado",
    category: "health",
    price: 68.00,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: [
        { title: "300g", price: 68.00 }
    ]
  },
  {
    id: 8,
    name: "Maca Peruana",
    category: "energy",
    price: 49.90,
    image: "https://cdn.awsli.com.br/600x450/49/49309/produto/231442297/creatina-i27guiin0r.png",
    skus: []
  }
];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const count = document.getElementById("count");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

let activeCategory = "all";
let searchTerm = "";

function render() {
  const filtered = products.filter(p =>
    (activeCategory === "all" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm)
  );

  grid.innerHTML = "";

  if (filtered.length === 0) {
    count.style.display = 'none';
    grid.innerHTML = `
      <div class="not-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente usar termos diferentes ou limpar os filtros</p>
      </div>
    `;
  } else {
    count.style.display = 'block';
    count.textContent = `${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`;
    
    filtered.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.image}">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>R$ ${p.price.toFixed(2)}</p>
          <button onclick="openModal(${p.id})">Ver detalhes</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }
}

function openModal(id) {
  const product = products.find(p => p.id === id);
  modalTitle.textContent = product.name;
  modalBody.innerHTML = product.skus.length
    ? product.skus.map(s => `<p>${s.title} — R$ ${s.price}</p>`).join("")
    : "<p>Sem variações</p>";
  modal.classList.remove("hidden");
}

function setWhatsAppLink() {
  const whatsappNumbers = {
    morning: "557996760454", // Manhã: 6h às 11:59h
    afternoon: "557981057602", // Tarde: 12h às 17:59h
    night: "557981344583" // Noite: 18h às 5:59h
  };

  const hour = new Date().getHours();
  let number;

  if (hour >= 6 && hour < 12) {
    number = whatsappNumbers.morning;
  } else if (hour >= 12 && hour < 18) {
    number = whatsappNumbers.afternoon;
  } else {
    number = whatsappNumbers.night;
  }

  const link = document.getElementById("whatsapp-link");
  if (link) {
    link.href = `https://wa.me/${number}`;
  }
}

document.getElementById("closeModal").onclick = () =>
  modal.classList.add("hidden");

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value.toLowerCase();
  render();
});

document.querySelectorAll(".categories button").forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".categories .active")?.classList.remove("active");
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    render();
  };
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  setWhatsAppLink();
  render();
});