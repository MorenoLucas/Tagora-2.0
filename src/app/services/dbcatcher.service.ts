import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductPost } from '../classes/product-post';
import { TattooPost } from '../classes/tattoo-post';
import { User } from '../classes/user';
import  UserJSON  from '../jsons/user.json';
import  TattoosJSON from '../jsons/tattooposts.json';
import  ProductJSON from '../jsons/product.json';

@Injectable({
  providedIn: 'root'
})
export class DBCatcherService {

  ID_postsT: number = 0; //tattoos
  ID_postsP: number = 0; //products
  UserList: User[] = [];
  TattooPostsList: TattooPost[] = [];
  ProductPostsList: ProductPost[] = [];
  tempuser: User;
  tempTattooPosts: TattooPost;
  tempProductPost: ProductPost;

  constructor(private db: AngularFirestore) {

    for (let i = 0; i < UserJSON.length; i++) {
      this.tempuser = new User(
        UserJSON[i].UserID.toString(),
        UserJSON[i].nombre,
        UserJSON[i].apellidos,
        UserJSON[i].alias,
        UserJSON[i].password,
        UserJSON[i].email,
        UserJSON[i].isTatuador,
        UserJSON[i].tel,
        UserJSON[i].imgUsuario
      );
      let tempavg = 0;
      this.tempuser.valoracionArray = UserJSON[i].valoracion;
      this.tempuser.valoracionArray.forEach(element => {
        tempavg += element;
      });
      this.tempuser.valoracion = tempavg / this.tempuser.valoracionArray.length;
      this.UserList.push(this.tempuser);
      this.setTempUserToFirestore();

    }

    //TattooPost
  for (let i = 0; i < TattoosJSON.length; i++) {
    this.tempTattooPosts = new TattooPost(
      TattoosJSON[i].postNombre,
      TattoosJSON[i].postImg,
      TattoosJSON[i].descripcion,
      TattoosJSON[i].Tags,
      TattoosJSON[i].UserID.toString(),
      TattoosJSON[i].Likes
    );
    this.tempTattooPosts.id = this.ID_postsT++;
    this.TattooPostsList.push(this.tempTattooPosts);
    this.setTempTattoosPostsToFirestore();
  }

  //Productos
  for (let i = 0; i < ProductJSON.products.length; i++) {
    this.tempProductPost = new ProductPost(
      ProductJSON.products[i].postNombre,
      ProductJSON.products[i].postImg,
      ProductJSON.products[i].descripcion,
      ProductJSON.products[i].Tags,
      ProductJSON.products[i].UserID.toString(),
      ProductJSON.products[i].Precio,
    );
    for (let counter = 0; counter < this.UserList.length; counter++) {
      if (this.tempProductPost.UserID == this.UserList[counter].id) {
        this.tempProductPost.VendorValoracion =
          this.UserList[counter].valoracion;
      }
    }
    this.tempProductPost.id = this.ID_postsP++;
    this.ProductPostsList.push(this.tempProductPost);
    this.setTempProductsToFirestore();
  }


  }

  getFromFireStoreDB(){

  }

  // --------------------------- USER FUNCTIONS ------------------------------------

  setNewUser(data){
    this.tempuser = new User(
      this.generateUID(), //AQUI IRA EL ID UNICO CON MATH RANDOM.
      (data.nombre) ? data.nombre : "" ,
      (data.apellidos) ? data.apellidos : "" ,
      data.alias,
      data.password,
      data.email,
      (data.isTatuador) ? data.isTatuador : false ,
      (data.tel) ? data.tel : 111111111 ,
      (data.imgUsuario) ? data.imgUsuario : "../assets/imgs/user.png",
    );
    this.setTempUserToFirestore();
  }

  generateUID(): string {
    let dateString = Date.now().toString(36);
    let randomChain = Math.random().toString(36).substr(2);
    return dateString + randomChain;
  }

  getUser(){

  }

  setTempUserToFirestore(){
    this.db.collection("Users").doc(this.tempuser.id.toString()).set({
      "UserID": this.tempuser.id,
      "nombre": this.tempuser.nombre,
      "apellidos": this.tempuser.apellidos,
      "alias": this.tempuser.alias,
      "password": this.tempuser.password,
      "email": this.tempuser.email,
      "isTatuador": this.tempuser.isTatuador,
      "tel": this.tempuser.tel,
      "imgUsuario": this.tempuser.imgUsuario,
      "valoraciones": this.tempuser.valoracionArray,
      "valoracionAvg": this.tempuser.valoracion,
    })
    .then(docRef =>{
      console.log("New User Created");
    })
    .catch(error => {
      console.error(error);
    })
  }

  // ------------------------------ POST FUNCTIONS ------------------------------------

  setTempProductsToFirestore(){
    this.db.collection("Productos").doc(this.tempProductPost.id.toString()).set({
      "postName": this.tempProductPost.postNombre,
      "postImg": this.tempProductPost.postImg,
      "Description": this.tempProductPost.Descripcion,
      "Tags": this.tempProductPost.Tags,
      "VendorID": this.tempProductPost.UserID.toString(),
      "VendorValoration": this.tempProductPost.VendorValoracion,
    })
    .then(docRef =>{
      console.log("New Post type Product Created");
    })
    .catch(error => {
      console.error(error);
    })
  }

  setTempTattoosPostsToFirestore(){
    this.db.collection("Tattoos").doc(this.tempTattooPosts.id.toString()).set({
      "postName": this.tempTattooPosts.postNombre,
      "postImg": this.tempTattooPosts.postImg,
      "Description": this.tempTattooPosts.Descripcion,
      "Tags": this.tempTattooPosts.Tags,
      "UserID": this.tempTattooPosts.UserID.toString(),
      "Likes": this.tempTattooPosts.likes,
    })
    .then(docRef =>{
      console.log("New Post type Tattoo Created");
    })
    .catch(error => {
      console.error(error);
    })
  }

  setNewPost(data, postType, userID){

  }



}
