import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/app.state.interface';
import * as AuthActions from 'src/app/store/authorization/actions';
import {
  isLoginFailSelector,
  isLoginSelector,
} from 'src/app/store/authorization/selectors';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private router: Router
  ) {
    const s = this.store.pipe(select(isLoginFailSelector)).subscribe({
      next: (isFail) => {
        isFail ? this.loginForm.reset() : null;
      },
    });
    const s1 = this.store.pipe(select(isLoginSelector)).subscribe({
      next: (isLogin) => {
        isLogin ? this.router.navigate(['/']) : null;
      },
    });
    this.subscriptions.push(s);
  }

  private subscriptions: Subscription[] = [];

  svgLink = svgLink;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
  });

  ngOnDestroy() {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

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
    this.store.dispatch(AuthActions.loginUser(data));
  }
}
