import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductPost } from '../classes/product-post';
import { TattooPost } from '../classes/tattoo-post';
import { User } from '../classes/user';
import  UserJSON  from '../jsons/user.json';

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
    this.setTempUserToFirestore();

  }
  }

  getFromFireStoreDB(){

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




}
