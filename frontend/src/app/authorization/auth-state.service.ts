import { Injectable } from '@angular/core';
import { AuthState } from './authorization.model';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authState: AuthState = { isLogin: false, login: '', type: '' };
  private hasSingInEmiter = new BehaviorSubject<AuthState>({
    isLogin: false,
    login: '',
    type: '',
  });

  hasSingIn$ = this.hasSingInEmiter
    .asObservable()
    .pipe(map((state) => state.isLogin));
  authAccount$ = this.hasSingInEmiter
    .asObservable()
    .pipe(map((state) => state.login));

  getAuthState() {
    return this.authState;
  }

  getIsAdmin() {
    return 'admin' === this.authState.type;
  }

  signOut() {
    this.authState = { isLogin: false, login: '', type: '' };
    this.hasSingInEmiter.next(this.authState);
  }

  setState(state: AuthState) {
    this.authState = state;
    this.hasSingInEmiter.next(this.authState);
  }
}
