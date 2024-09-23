import { v4 as randomUUID } from "uuid";

export class Product {
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
