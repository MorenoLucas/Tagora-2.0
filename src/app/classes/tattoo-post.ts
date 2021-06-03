export class TattooPost {

  id: number;
  postNombre: String;
  postImg: String;
  Descripcion: String;
  Tags: String[] = [];
  UserID: number;
  likes: number;

  constructor(postName, postImg, description, tags, UserID, likes){
    this.postNombre = postName;
    this.postImg = postImg;
    this.Descripcion = description;
    this.Tags = tags;
    this.UserID = UserID;
    this.likes = likes;
  }
}
