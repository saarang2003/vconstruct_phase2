const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 150 },
  { id: 3, name: "Product 3", price: 200 },
  { id: 4, name: "Product 4", price: 250 },
  { id: 5, name: "Product 5", price: 300 },
  { id: 6, name: "Product 6", price: 400 },
  { id: 7, name: "Product 7", price: 450 },
  { id: 8, name: "Product 8", price: 240 },
  { id: 9, name: "Product 9", price: 470 },
];

const productContainer = document.getElementById("product-list");

// Render products dynamically
products.forEach((product) => {
  const productElement = document.createElement("div");
  productElement.className = "product-item";
  productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button class="add-to-viewed" data-id="${product.id}">View Product</button>
    `;
  productContainer.appendChild(productElement);
});

// Function to add product to storage
function addProductToStorage(product, storageType = "local") {
  const storage = storageType === "local" ? localStorage : sessionStorage;

  let viewed = JSON.parse(storage.getItem("recentlyViewed")) || [];

  // Remove existing if already viewed (to move it to front)
  viewed = viewed.filter((p) => p.id !== product.id);

  // Add product to the front
  viewed.unshift(product);

  // Keeping 5
  if (viewed.length > 5) viewed = viewed.slice(0, 5);

  storage.setItem("recentlyViewed", JSON.stringify(viewed));
}

function showStorageType(storageType) {
  const storageName = document.getElementById("storage-name");
  storageName.textContent =
    storageType === "local"
      ? " Showing Local Storage"
      : " Showing Session Storage";
}

// Click listener for product buttons -> don't have to add button listener for every product id
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-viewed")) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === productId);

    // Add to both storages
    addProductToStorage(product, "local");
    addProductToStorage(product, "session");

    alert(`You viewed ${product.name}!`);
  }
});

// rdering recently viwed products
function showRecentlyViewed(storageType) {
  const storage = storageType === "local" ? localStorage : sessionStorage;
  const viewed = JSON.parse(storage.getItem("recentlyViewed")) || [];
  const container = document.getElementById("recently-viewed");

  container.innerHTML = "";

  if (viewed.length === 0) {
    container.innerHTML = "<p>No products viewed yet.</p>";
    return;
  }

  viewed.forEach((product) => {
    const div = document.createElement("div");
    div.className = "recent-product";
    div.innerHTML = `<h3>${product.name}</h3> <p> Price : $${product.price}`;
    container.appendChild(div);
  });
}

// Buttons to switch storage
document.getElementById("show-local").addEventListener("click", () => {
  showStorageType("local");
  showRecentlyViewed("local");
});

document.getElementById("show-session").addEventListener("click", () => {
  showStorageType("session");
  showRecentlyViewed("session");
});

// Optional: show localStorage by default
showRecentlyViewed("local");
