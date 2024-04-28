import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { RemindPasswordComponent } from './authorization/remind-password/remind-password.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'cats', component: HomeComponent },
  { path: 'dogs', component: HomeComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'remind-password/:hash', component: ResetPasswordComponent },
];
