import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpLoginService } from 'src/app/authorization/login/http-login.service';
import * as AuthActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEffectService {
  constructor(private actions$: Actions, private httpLogin: HttpLoginService) {}

  private loginUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((data) => this.httpLogin.logIn(data)),
      map((authorization) => {
        const data = { ...authorization, error: null };
        return AuthActions.loginUserSuccess({ authorization: data });
      }),
      catchError((data: Error) => {
        return of(AuthActions.loginUserFail({ error: data.message }));
      })
    )
  );
}
