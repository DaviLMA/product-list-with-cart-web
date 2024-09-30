import { v4 as randomUUID } from "uuid";
import { Product } from "./product";

export class ShoppingCart {
  private items: Product[] = [];

  addToCart(product: Product): void {
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.items.push(product);
    }
    this.updateCartDisplay();
  }

  removeFromCart(product: Partial<Product>): void {
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.items = this.items.filter((item) => item.id !== product.id);
      }
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
            <button class="remove-button" data-id="${item.id}">
              <img src="assets/images/icons8-reduce-50.png" alt="Remove" />
            </button>
          </div>
        `;
      });
      cartCount.innerText = `${this.items.length}`;
      totalElement.innerText = `$${this.getTotal().toFixed(2)}`;

      // Attach event listeners to remove buttons
      this.attachRemoveButtonListeners();
    }
  }

  private attachRemoveButtonListeners(): void {
    const removeButtons = document.querySelectorAll(".remove-button");

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        if (productId) {
          const productToRemove = { id: productId }; // Create a mock product object
          this.removeFromCart(productToRemove);
        }
      });
    });
  }
}
