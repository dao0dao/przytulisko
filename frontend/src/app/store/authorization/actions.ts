import { createAction, props } from '@ngrx/store';
import { AuthorizationStateInterface } from 'src/app/types/authorization/authorization.state.interface';

export const loginUser = createAction(
  '[API login] API login user',
  props<{ email: string; password: string }>()
);

export const checkLoginUser = createAction('[API check login] API check is user login')

export const loginUserSuccess = createAction(
  '[API login] API login success',
  props<{ authorization: AuthorizationStateInterface }>()
);

export const loginUserFail = createAction(
  '[API login] API Login fail',
  props<{ error: string }>()
);

export const logoutUserAPI = createAction('[API] API logout user');

export const logoutUser = createAction('Logout user');
