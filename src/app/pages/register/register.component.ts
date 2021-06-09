import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DBCatcherService } from 'src/app/services/dbcatcher.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbCatcher: DBCatcherService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      alias: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isTatuador: [false],
    });
  }

  async onSubmit() {
    console.warn(this.registerForm.getRawValue());
    const data = this.registerForm.getRawValue();
    await this.dbCatcher.setNewUser(data);
    const user = { email: data.email, password: data.password };
    this.userService.login(user).subscribe((datos) => {
      datos.forEach((doc) => {
        this.userService.setToken(doc.id);
        this.router.navigateByUrl('/');
      });
    });
    this.userService.registerAuth(data.email, data.password);
  }
}
