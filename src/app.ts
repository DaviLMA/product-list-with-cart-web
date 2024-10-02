import { v4 as randomUUID } from "uuid";
import { Product } from "./entities/product";
import { ShoppingCart } from "./entities/shoppingcart";

// Instancia o carrinho de compras
const cart = new ShoppingCart();

// Função para buscar dados em JSON e gerar produtos
async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const productData = await response.json();
    generateProductList(productData);
  } catch (error) {
    console.error("Falha ao carregar os dados dos produtos", error);
  }
}

// Função para gerar os elementos dos produtos e adicionar ao DOM
function generateProductList(productData: any[]) {
  const productList = document.getElementById("productList");

  if (productList) {
    productData.forEach((data) => {
      const product = new Product(
        data.name,
        data.category,
        data.image, // Passando o objeto de imagens
        data.price
      );

      const productElement = document.createElement("div");
      productElement.classList.add("product");

      // Escolhe a imagem com base na largura da tela (desktop, tablet, mobile)
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
          <div class="button">Adicionar ao Carrinho</div>
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

// Busca os produtos quando a página carrega
fetchProducts();

// Adiciona event listener ao botão de confirmar pedido
document.getElementById("confirmOrderBtn")?.addEventListener("click", () => {
  const confirmButton = document.getElementById("confirmOrderBtn");
  confirmButton?.classList.add("pop-animation");
  setTimeout(() => {
    confirmButton?.classList.remove("pop-animation");
  }, 300); // A duração deve coincidir com o tempo da animação

  alert("Seu pedido foi confirmado!");
});
