import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/app.state.interface';

const selectorAuthorizationFeature = (app: AppStateInterface) =>
  app.authorization;

export const isLoginSelector = createSelector(
  selectorAuthorizationFeature,
  (state) => state.isLogin
);

export const isUserAdminSelector = createSelector(
  selectorAuthorizationFeature,
  (state) => 'admin' === state.type
);

export const isLoginFailSelector = createSelector(
  selectorAuthorizationFeature,
  (state) => null !== state.error
);

export const loginUserNameSelector = createSelector(
  selectorAuthorizationFeature,
  (state) => state.login
);