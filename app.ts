import { v4 as randomUUID } from "uuid";
import { Product } from "./src/entities/product";

class ShoppingCart {
  private items: Product[] = [];

  addToCart(product: Product): void {
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.items.push(product);
    }
    this.updateCartDisplay();
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  updateCartDisplay(): void {
    const cartElement = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalElement = document.getElementById("cartTotal");

    if (cartElement && totalElement && cartCount) {
      cartElement.innerHTML = ""; // Clear previous cart items
      this.items.forEach((item) => {
        cartElement.innerHTML += `
          <div class="cart-item">
            <span class="name">${item.name} (${item.quantity}x)</span>
            <span class="price">$${(item.price * item.quantity).toFixed(
              2
            )}</span>
          </div>
        `;
      });
      cartCount.innerText = `${this.items.length}`;
      totalElement.innerText = `$${this.getTotal().toFixed(2)}`;
    }
  }
}

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

      productElement.querySelector(".button")?.addEventListener("click", () => {
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
  alert("Your order has been confirmed!");
});
