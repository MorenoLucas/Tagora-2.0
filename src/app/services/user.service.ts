import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  login(user: any) {
    let token;
    const filter = (ref) =>
      ref
        .where('email', '==', user.email)
        .where('password', '==', user.password);

    //  buscar en base de datos y comprar email y contraseña, devuelve ID
    return this.db.collection('Users', filter).get();
    // .subscribe((datos) => {
    //   datos.forEach((doc) => {
    //     // devuelve el id.
    //     token = doc.id;
    //   });
    // });

    // .toPromise()
    // .then((datos) => {
    //   datos.forEach((doc) => {
    //     // devuelve el id.
    //     token = doc.id;
    //   });
    // });
  }
}
