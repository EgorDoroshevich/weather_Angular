import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  auth = inject(AuthService);
  router = inject(Router);

  formGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      //@ts-ignore
      this.auth.login(this.formGroup.value).subscribe((response) => {
        this.router.navigate(['weather']);
        console.log(response);
      });
    }
  }
}
