import { v4 as randomUUID } from "uuid";

class Product {
  private _id: string = randomUUID();
  private _name: string;
  private _category: string;
  private _imageUrl: string;
  private _price: number;

  constructor(
    id: string,
    name: string,
    category: string,
    imageUrl: string,
    price: number
  ) {
    this._id = id;
    this._name = name;
    this._category = category;
    this._imageUrl = imageUrl;
    this._price = price;
  }
}
