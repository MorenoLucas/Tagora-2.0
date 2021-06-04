import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user);
  }
}
