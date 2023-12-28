import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { HttpLoginService } from './http-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  svgLink = svgLink;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(10)],
    ],
  });

  constructor(private fb: FormBuilder, private http: HttpLoginService) {}

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
    };
    this.http.logIn(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
