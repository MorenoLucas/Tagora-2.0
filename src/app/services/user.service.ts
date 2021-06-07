import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore, private cookies: CookieService) {}

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
}
