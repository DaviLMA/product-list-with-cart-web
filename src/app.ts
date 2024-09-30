import { v4 as randomUUID } from "uuid";
import { Product } from "./entities/product";
import { ShoppingCart } from "./entities/shoppingcart";

// Instantiate the shopping cart
const cart = new ShoppingCart();

// Function to fetch JSON data and generate products
async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const productData = await response.json();
    generateProductList(productData);
  } catch (error) {
    console.error("Failed to load product data", error);
  }
}

// Function to generate product elements and add to the DOM
function generateProductList(productData: any[]) {
  const productList = document.getElementById("productList");

  if (productList) {
    productData.forEach((data) => {
      const product = new Product(
        data.name,
        data.category,
        data.image, // Passing image object
        data.price
      );

      const productElement = document.createElement("div");
      productElement.classList.add("product");

      // Choose the image based on the screen width (desktop, tablet, mobile)
      const imageUrl =
        window.innerWidth > 1024
          ? product.images.desktop
          : window.innerWidth > 768
          ? product.images.tablet
          : product.images.mobile;

      productElement.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" />
        <div class="product-footer">
          <div class="category">${product.category}</div>
          <div class="name">${product.name}</div>
          <div class="price">$${product.price.toFixed(2)}</div>
          <div class="button">Add to Cart</div>
        </div>
      `;

      const button = productElement.querySelector(".button");
      button?.addEventListener("click", () => {
        button.classList.add("pulse-animation");
        setTimeout(() => {
          button.classList.remove("pulse-animation");
        }, 300);

        cart.addToCart(product);
      });

      productList.appendChild(productElement);
    });
  }
}

// Fetch the products when the page loads
fetchProducts();

// Add event listener to confirm order button
document.getElementById("confirmOrderBtn")?.addEventListener("click", () => {
  const confirmButton = document.getElementById("confirmOrderBtn");
  confirmButton?.classList.add("pop-animation");
  setTimeout(() => {
    confirmButton?.classList.remove("pop-animation");
  }, 300); // Duration should match the animation time

  alert("Your order has been confirmed!");
});
