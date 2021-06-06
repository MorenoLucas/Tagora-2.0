import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe((datos) => {
      datos.forEach((doc) => {
        // devuelve el id.
        console.log(doc.id);
        // insertamos el token para que se guarde en la cookie
        this.userService.setToken(doc.id);
        // te lleva al inicio si coincide
        this.router.navigateByUrl('/');
      });
    });
  }
}
