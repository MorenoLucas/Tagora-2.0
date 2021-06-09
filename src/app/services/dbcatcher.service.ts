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
    this.catchDBfromFirestore();
  }

  getFromFireStoreDB(){

  }

  // --------------------------- USER FUNCTIONS ------------------------------------


  async catchDBfromFirestore(){
    const usersCol = this.db.collection("Users");
    const tattoosCol = this.db.collection("Tattoos");
    const productsCol = this.db.collection("Productos");

    //USERS
    await usersCol.get().toPromise() //esperamos a coger las cosas de la base de datos con el get, y luego para usar el then lo convertimos a Promise
    .then((snapShot) => {
      snapShot.forEach(user => {
        //creamos el nuevo user con la info y lo pusheamos
        let userData = user.data(); //para pillar cosas del documento, usamos la funcion data(), que devuelve ujn objeto en si
        this.tempuser = new User(
          user.id,
          userData["nombre"],
          userData["apellidos"],
          userData["alias"],
          userData["password"],
          userData["email"],
          userData["isTatuador"],
          userData["tel"],
          userData["imgUsuario"],
          userData["valoraciones"]
        );
        this.UserList.push(this.tempuser);

      })
    });

    await tattoosCol.get().toPromise()
    .then((snapShot) => {
      snapShot.forEach(tattoos => {
        let tattoosData = tattoos.data();
        this.tempTattooPosts = new TattooPost(
          tattoosData["postName"],
          tattoosData["postImg"],
          tattoosData["Description"],
          tattoosData["Tags"],
          tattoosData["UserID"],
          tattoosData["Likes"]
        );

        this.TattooPostsList.push(this.tempTattooPosts);
      })
    });

    await productsCol.get().toPromise()
    .then((snapShot) => {
      snapShot.forEach(products => {
        let productsData = products.data();
        this.tempProductPost = new ProductPost(
          productsData["postName"],
          productsData["postImg"],
          productsData["Description"],
          productsData["Tags"],
          productsData["VendorID"],
          productsData["VendorValoration"]
        );

        this.ProductPostsList.push(this.tempProductPost);
      })
    });
  }


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
    this.setUserToFirestore();
  }

  generateUID(): string {
    let dateString = Date.now().toString(36);
    let randomChain = Math.random().toString(36).substr(2);
    return dateString + randomChain;
  }


  setUserToFirestore(){
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
      this.UserList.push(this.tempuser);
    })
    .catch(error => {
      console.error(error);
    })
  }



  // ------------------------------ POST FUNCTIONS ------------------------------------

  setNewPost(data, postType, userID){

  }


  // ----------------------------- GETTERS & SETTERS -----------------------------------
  getUserList() {
    return this.UserList;
  }

  getTattooPostsList() {
    return this.TattooPostsList;
  }

  getProductPostsList() {
    return this.ProductPostsList;
  }


}





// -------- CODIGOS TEMPORALES NO USABLES --------------------
/*
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
*/
/*
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
*/
