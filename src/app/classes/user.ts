import {ProductPost} from '../classes/product-post';
import {TattooPost} from '../classes/tattoo-post';

export class User {
  id: string;
  nombre: String;
  apellidos: String;
  alias: String;
  password: String;
  email: string;
  isTatuador: boolean;
  tel: number;
  imgUsuario: string;
  valoracionArray: number[];
  valoracion: number;
  TattooPosts: number[];
  ProductPosts: number[];

  constructor(
    newID: string,
    newNombre: String,
    newApellidos: String,
    newAlias: String,
    newPassword: String,
    newEmail: string,
    newIsTatuador: boolean = false,
    newTel: number = 111111111,
    newImgUsuario: string = "https://media.istockphoto.com/photos/handsome-and-happy-picture-id516065432?k=6&m=516065432&s=612x612&w=0&h=0On1LTM9MSRBK7DlQPd71uakgMR74moV4LSgv-ZLQmk=") {

      this.id = newID;
      this.nombre = newNombre;
      this.apellidos = newApellidos;
      this.alias = newAlias;
      this.password = newPassword;
      this.email = newEmail;
      this.tel = newTel;
      this.imgUsuario = newImgUsuario;
      this.isTatuador = newIsTatuador;
      this.valoracionArray = [];
      this.valoracion = 0;
      this.TattooPosts = [];
      this.ProductPosts = [];
  }


  getPersonAlias(){
    return this.alias;
  }
  getPersonPassword(){
      return this.password;
  }
  getPersonJobStatus(){
      return this.isTatuador;
  }
}
