import { createReducer, on } from '@ngrx/store';
import { AuthorizationStateInterface } from 'src/app/types/authorization/authorization.state.interface';
import * as AuthActions from './actions';

const initialState: AuthorizationStateInterface = {
  isLogin: false,
  login: '',
  type: '',
  isSuperAdmin: false,
  error: null,
};

const resetState: AuthorizationStateInterface = Object.freeze({
  isLogin: false,
  login: '',
  type: '',
  isSuperAdmin: false,
  error: null,
});

export const AuthorizationReducer = createReducer(
  initialState,
  on(AuthActions.loginUserSuccess, (state, actions) => {
    const { isLogin, login, type, isSuperAdmin } = actions.authorization;
    return { ...state, isLogin, login, type, isSuperAdmin };
  }),
  on(AuthActions.loginUserFail, (state, actions) => ({
    ...resetState,
    error: actions.error,
  })),
  on(AuthActions.logoutUser, () => ({ ...resetState }))
);
