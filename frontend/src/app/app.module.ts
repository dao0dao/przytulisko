import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorizationReducer } from './store/authorization/reducer';
import { AuthorizationEffectService } from './store/authorization/authorization-effect.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    PetAddEditComponent,
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
    StoreModule.forRoot({ authorization: AuthorizationReducer }),
    EffectsModule.forRoot([AuthorizationEffectService]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiError, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
