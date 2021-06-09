import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
// import { auth } from 'firebase/app';
// import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user;
  constructor(
    private db: AngularFirestore,
    private cookies: CookieService,
    public afAuth: AngularFireAuth
  ) {}

  login(user: any) {
    const filter = (ref) =>
      ref
        .where('email', '==', user.email)
        .where('password', '==', user.password);

    //  buscar en base de datos y comprar email y contraseña, devuelve un observable con el usuario
    return this.db.collection('Users', filter).get();
  }
  setToken(token) {
    this.cookies.set('token', token);
  }
  getToken() {
    return this.cookies.get('token');
  }
  // aqui  devuelve el usuario
  getUser() {
    const token = this.getUserLogged;
    const filter = (ref) => ref.where('userID', '==', token);
    return this.db.collection('Users', filter).get();
  }
  getUserLogged() {
    return this.getToken();
  }
  // Autentificación con firebase
  async loginAuth(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async registerAuth(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
//  mostrar al usuario registrado en distinto componente,
//  public user$: Observable <any> = this.userService.afAuth.user
