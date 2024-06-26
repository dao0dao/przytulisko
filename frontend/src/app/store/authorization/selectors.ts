import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/app.state.interface';

const selectorAuthorizationFeature = (app: AppStateInterface) =>
  app.authorization;

export const isUserLogin = createSelector(
  selectorAuthorizationFeature,
  (state) => state.isLogin
);

export const isAdmin = createSelector(
  selectorAuthorizationFeature,
  (state) => 'admin' === state.type
);
