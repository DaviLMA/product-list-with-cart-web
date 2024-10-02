import { v4 as randomUUID } from "uuid";

// Define a classe Product (Produto) que representa um item no sistema de compras
export class Product {
  // Propriedades privadas do produto, incluindo um identificador único gerado automaticamente
  private _id: string = randomUUID(); // Gera um ID único para cada produto usando a biblioteca 'uuid'
  private _name: string; // Nome do produto
  private _category: string; // Categoria à qual o produto pertence
  private _images: {
    // Diferentes versões de imagens do produto, dependendo da plataforma
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  private _price: number; // Preço do produto
  private _quantity: number; // Quantidade do produto no carrinho (valor padrão de 1)

  // O construtor inicializa os valores das propriedades do produto
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
    quantity: number = 1 // A quantidade do produto começa com 1, mas pode ser personalizada
  ) {
    this._name = name;
    this._category = category;
    this._images = images;
    this._price = price;
    this._quantity = quantity;
  }

  // Método getter para retornar o ID do produto
  get id(): string {
    return this._id;
  }

  // Método getter para retornar o nome do produto
  get name(): string {
    return this._name;
  }

  // Método getter para retornar o preço do produto
  get price(): number {
    return this._price;
  }

  // Método getter para retornar as imagens do produto
  get images(): {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  } {
    return this._images;
  }

  // Método getter para retornar a categoria do produto
  get category(): string {
    return this._category;
  }

  // Método getter para retornar a quantidade do produto
  get quantity(): number {
    return this._quantity;
  }

  // Método setter para atualizar a quantidade do produto, garantindo que não seja inferior a 1
  set quantity(newQuantity: number) {
    if (newQuantity > 0) {
      this._quantity = newQuantity;
    }
  }
}
