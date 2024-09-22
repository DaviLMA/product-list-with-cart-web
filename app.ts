import { v4 as randomUUID } from "uuid";

// Product class definition (updated to include all image formats)
class Product {
  private _id: string = randomUUID();
  private _name: string;
  private _category: string;
  private _images: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  private _price: number;
  private _quantity: number;

  constructor(
    name: string,
    category: string,
    images: {
      thumbnail: string;
      mobile: string;
      tablet: string;
      desktop: string;
    },
    price: number,
    quantity: number = 1
  ) {
    this._name = name;
    this._category = category;
    this._images = images;
    this._price = price;
    this._quantity = quantity;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get images(): {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  } {
    return this._images;
  }

  get category(): string {
    return this._category;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(newQuantity: number) {
    if (newQuantity > 0) {
      this._quantity = newQuantity;
    }
  }
}

// ShoppingCart class remains the same as before
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
