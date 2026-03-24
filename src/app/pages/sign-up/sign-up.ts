import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LocalStorage } from '../../data/services/local-storage';
import { SignUpInterface, User } from '../../data/interfaces/interface';
import { RouterLink, RouterLinkActive, ɵEmptyOutletComponent } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  localStorageService = inject(LocalStorage);

  user: User[] = [];

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    login: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
      this.passwordMatchValidator(),
    ]),
  });

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (!formGroup) return null;

      const password = formGroup.get('password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.createUser();
    } else {
      return;
    }
  }

  createUser() {
    const formValue = this.formGroup.getRawValue();
    const User: User = {
      id: Date.now(),
      value: {
        name: formValue.name,
        login: formValue.login,
        password: formValue.password,
        confirmpassword: formValue.confirmpassword,
      },
    };
    this.user.push(User);
    this.saveUser(User);
    this.formGroup.reset();
  }
  saveUser(user: User) {
    this.localStorageService.set('пользователи', this.user);
  }
}
