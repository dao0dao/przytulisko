import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { RemindPasswordComponent } from './authorization/remind-password/remind-password.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'remind-password/12' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'remind-password/:hash', component: ResetPasswordComponent },
];
