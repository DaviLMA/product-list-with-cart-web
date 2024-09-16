import { v4 as randomUUID } from "uuid";

class Product {
  private _id: string = randomUUID();
  private _name: string;
  private _category: string;
  private _imageUrl: string;

  constructor(id: string, name: string, category: string, imageUrl: string) {
    this._id = id;
    this._name = name;
    this._category = category;
    this._imageUrl = imageUrl;
  }
}
