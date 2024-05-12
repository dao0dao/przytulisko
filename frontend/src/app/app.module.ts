import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiError } from './api-error.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authorization/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './authorization/register/register.component';
import { InfoModalComponent } from './infrastructure/info-modal/info-modal.component';
import { RemindPasswordComponent } from './authorization/remind-password/remind-password.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './authorization/pets/pets.component';
import { PetAddEditComponent } from './authorization/pet-add-edit/pet-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    InfoModalComponent,
    RemindPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    PetsComponent,
    PetAddEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiError, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
