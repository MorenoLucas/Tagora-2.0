import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DBCatcherService } from 'src/app/services/dbcatcher.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private dbCatcher: DBCatcherService) {}

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
  }
}
