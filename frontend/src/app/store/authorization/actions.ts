import { createAction, props } from '@ngrx/store';
import { AuthorizationStateInterface } from 'src/app/types/authorization/authorization.state.interface';

export const loginUser = createAction(
  '[API login] API log in user',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[API login success] API log in user',
  props<{ authorization: AuthorizationStateInterface }>()
);

export const loginUserFail = createAction(
  '[API login success] API log in user',
  props<{ error: string }>()
);

export const logoutUser = createAction('[API] API log in user');
