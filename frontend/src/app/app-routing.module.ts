import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { RemindPasswordComponent } from './authorization/remind-password/remind-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'remind-password' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'remind-password/:id', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
