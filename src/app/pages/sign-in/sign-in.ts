import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  formGroup = new FormGroup({
    login: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
