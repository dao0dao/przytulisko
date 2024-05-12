import { Routes } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { RemindPasswordComponent } from './authorization/remind-password/remind-password.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './authorization/pets/pets.component';
import { PetAddEditComponent } from './authorization/pet-add-edit/pet-add-edit.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'pet/:action/:id', component: PetAddEditComponent },
  { path: 'pet/:action', component: PetAddEditComponent },
  { path: 'cats', component: HomeComponent },
  { path: 'dogs', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'remind-password', component: RemindPasswordComponent },
  { path: 'remind-password/:hash', component: ResetPasswordComponent },
];
