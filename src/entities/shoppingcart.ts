import { v4 as randomUUID } from "uuid";
import { Product } from "./product";

export class ShoppingCart {
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
