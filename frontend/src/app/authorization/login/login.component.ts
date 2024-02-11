import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { HttpLoginService } from './http-login.service';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpLoginService,
    private router: Router,
    private authState: AuthStateService
  ) {}

  svgLink = svgLink;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
  });

  getField(fieldName: string) {
    return this.loginForm.get(fieldName);
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
    };
    this.http.logIn(data).subscribe({
      next: (state) => {
        this.authState.setState(state);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginForm.reset();
      },
    });
  }
}
