import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  login(user: any) {
    //  buscar en base de datos y comprar email y contraseña, devuelve ID
    this.db
      .collection('Users')
      .get()
      .then((datadB) => {
        datadB.forEach((doc) => {
          if (doc.email === user.email && doc.password === user.password) {
            const token = doc.userID;
          }
        });
      });
  }
}
