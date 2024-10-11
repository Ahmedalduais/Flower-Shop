const products = [
  { id: 1, name: "باقة ورد أحمر", price: 50, image: "img/1.jpeg", category: "باقات" },
  { id: 2, name: "زهور التوليب", price: 40, image: "img/2.jpeg", category: "أزهار منفردة" },
  { id: 3, name: "أوركيد أبيض", price: 60, image: "img/3.webp", category: "نباتات زينة" },
  { id: 4, name: "باقة زهور مشكلة", price: 55, image: "img/4.webp", category: "باقات" },
  { id: 5, name: "زهور الليلي", price: 45, image: "img/5.webp", category: "أزهار منفردة" },
  { id: 6, name: "باقة زهور الربيع", price: 65, image: "img/6.jpeg", category: "باقات" },
  { id: 7, name: "زهور القرنفل", price: 35, image: "img/7.jpeg", category: "أزهار منفردة" },
  { id: 8, name: "باقة الورد الأبيض", price: 70, image: "img/4.webp", category: "باقات" },
];

let cart = [];
let purchases = [];

function showPage(page) {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '';

  switch (page) {
    case 'home':
      renderHomePage();
      break;
    case 'products':
      renderProductsPage();
      break;
    case 'contact':
      renderContactPage();
      break;
    case 'purchases':
      renderPurchasesPage();
      break;
  }
}

function renderHomePage() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <header class="hero">
      <div class="hero-content">
        <h1>أهلاً بك في متجر الزهور</h1>
        <p>اكتشف باقاتنا الرائعة وأضف لمسة من الجمال إلى حياتك</p>
        <a onclick="showPage('products')" class="cta-button">تسوق الآن</a>
      </div>
    </header>
    <div class="product-grid" id="productGrid"></div>
  `;
  renderProducts();
}

function renderProductsPage() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <h2 style="text-align: center; margin: 2rem 0;">منتجاتنا</h2>
    <div class="product-grid" id="productGrid"></div>
  `;
  renderProducts();
}

function renderContactPage() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <div class="contact-form">
      <h2>اتصل بنا</h2>
      <form onsubmit="handleContactSubmit(event)">
        <input type="text" placeholder="الاسم" required>
        <input type="email" placeholder="البريد الإلكتروني" required>
        <textarea placeholder="رسالتك" required></textarea>
        <button type="submit">إرسال</button>
      </form>
    </div>
  `;
}

function renderPurchasesPage() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = `
    <div class="purchases-list">
      <h2>مشترياتك</h2>
      <ul>
        ${purchases.map(purchase => `
          <li>
            <p>${purchase.name} - الكمية: ${purchase.quantity} - السعر: ${purchase.price * purchase.quantity} ريال</p>
          </li>
        `).join('')}
      </ul>
    </div>
  `;
}

function renderProducts() {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img class="product-image" src="${product.image}" alt="${product.name}" width="250" height="200">
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price} ريال</div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">أضف إلى السلة</button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDropdown();
  }
}

function updateCartDropdown() {
  const cartDropdown = document.getElementById('cartDropdown');
  cartDropdown.innerHTML = '';

  if (cart.length === 0) {
    cartDropdown.innerHTML = '<p>السلة فارغة</p>';
  } else {
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `<br>
        <p>${item.name} </p>
        <p>  الكمية: ${item.quantity} </p>
        <p> السعر: ${item.price * item.quantity} ريال</p>
        <hr>
      `;
      cartDropdown.appendChild(itemElement);
    });

    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = 'إتمام الشراء';
    checkoutButton.onclick = handleCheckout;
    cartDropdown.appendChild(checkoutButton);
  }
}

function handleCheckout() {
  purchases = [...purchases, ...cart];
  cart = [];
  updateCartDropdown();
  alert('تم إتمام عملية الشراء بنجاح!');
}

function handleContactSubmit(event) {
  event.preventDefault();
  alert('تم إرسال رسالتك بنجاح!');
  showPage('home');
}

document.getElementById('cartIcon').addEventListener('click', function() {
  const cartDropdown = document.getElementById('cartDropdown');
  cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Initialize the home page
showPage('home');
