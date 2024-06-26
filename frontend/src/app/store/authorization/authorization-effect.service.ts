import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpLoginService } from 'src/app/authorization/login/http-login.service';
import * as AuthActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthorizationStateInterface } from 'src/app/types/authorization/authorization.state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationEffectService {
  constructor(private actions$: Actions, private httpLogin: HttpLoginService) {}

  private loginUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap((data) =>
        this.httpLogin.logIn({ email: data.email, password: data.password })
      ),
      map((authorization) => {
        const data = { ...authorization, error: null };
        return AuthActions.loginUserSuccess({ authorization: data });
      }),
      catchError((data: Error) => {
        return of(AuthActions.loginUserFail({ error: data.message }));
      })
    )
  );

  private checkLoginUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkLoginUser),
      mergeMap(() => this.httpLogin.checkIsLogin()),
      map((authorization) => {
        const data: AuthorizationStateInterface = {
          isLogin: authorization.isLogin,
          login: authorization.login,
          type: authorization.type,
          isSuperAdmin: authorization.isSuperAdmin,
          error: null,
        };
        return AuthActions.loginUserSuccess({ authorization: data });
      })
    )
  );

  private logoutUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      mergeMap(() => this.httpLogin.logOut()),
      map(()=>AuthActions.logoutUserAPI())
    )
  );
}
