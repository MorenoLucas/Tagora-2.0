export class ProductPost  {

  id: number;
  postNombre: String;
  postImg: String;
  Descripcion: String;
  Tags: String[] = [];
  Precio: number;
  UserID: string;
  VendorValoracion: number;

  constructor(postName, postImg, description, tags, UserID, price , vendorValoracion = 0){
    this.postNombre = postName;
    this.postImg = postImg;
    this.Descripcion = description;
    this.Tags = tags;
    this.UserID = UserID;
    this.Precio = price;
  }
}
