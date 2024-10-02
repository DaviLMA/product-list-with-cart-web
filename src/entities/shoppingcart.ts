import { v4 as randomUUID } from "uuid";
import { Product } from "./product";

// Define a classe ShoppingCart (Carrinho de Compras) que gerencia os itens do carrinho
export class ShoppingCart {
  // Armazena os produtos adicionados ao carrinho
  private items: Product[] = [];

  // Método para adicionar um produto ao carrinho
  addToCart(product: Product): void {
    // Verifica se o produto já existe no carrinho, comparando pelo ID
    const existingProduct = this.items.find((item) => item.id === product.id);

    // Se o produto já está no carrinho, aumenta a quantidade
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      // Caso contrário, adiciona o novo produto ao carrinho
      this.items.push(product);
    }
    // Atualiza a exibição visual do carrinho
    this.updateCartDisplay();
  }

  // Método para remover um produto do carrinho
  removeFromCart(product: Partial<Product>): void {
    // Verifica se o produto existe no carrinho
    const existingProduct = this.items.find((item) => item.id === product.id);

    if (existingProduct) {
      // Se o produto tem mais de 1 unidade, diminui a quantidade
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        // Caso contrário, remove o produto do carrinho
        this.items = this.items.filter((item) => item.id !== product.id);
      }
    }

    // Atualiza a exibição visual do carrinho
    this.updateCartDisplay();
  }

  // Método para calcular o valor total do carrinho
  getTotal(): number {
    // Faz a soma do preço de cada item multiplicado pela quantidade, iniciando com total zero
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Método para atualizar a interface do carrinho no HTML
  updateCartDisplay(): void {
    // Obtém os elementos HTML responsáveis por exibir os itens, a quantidade e o total do carrinho
    const cartElement = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const totalElement = document.getElementById("cartTotal");

    // Se os elementos existem, atualiza suas informações com base nos itens do carrinho
    if (cartElement && totalElement && cartCount) {
      // Limpa o conteúdo anterior
      cartElement.innerHTML = "";
      // Itera sobre os itens no carrinho e adiciona o HTML correspondente para cada produto
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
      // Atualiza a contagem de itens no carrinho e o total de preço
      cartCount.innerText = `${this.items.length}`;
      totalElement.innerText = `$${this.getTotal().toFixed(2)}`;
      // Adiciona os event listeners para os botões de remoção
      this.attachRemoveButtonListeners();
    }
  }

  // Método privado que adiciona os ouvintes de evento aos botões de remoção
  private attachRemoveButtonListeners(): void {
    // Seleciona todos os botões de remoção no DOM
    const removeButtons = document.querySelectorAll(".remove-button");

    // Adiciona um event listener a cada botão de remoção
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Obtém o ID do produto associado ao botão clicado
        const productId = button.getAttribute("data-id");
        if (productId) {
          // Cria um objeto produto simulado e remove do carrinho
          const productToRemove = { id: productId };
          this.removeFromCart(productToRemove);
        }
      });
    });
  }
}
