import { Injectable } from '@angular/core';
import { AuthState } from './authorization.model';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authState: AuthState = { isLogin: false, login: '' };
  private hasSingInEmiter = new BehaviorSubject<AuthState>({
    isLogin: false,
    login: '',
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

  signIn(login: string) {
    this.authState = { isLogin: true, login };
    this.hasSingInEmiter.next(this.authState);
  }

  signOut() {
    this.authState = { isLogin: false, login: '' };
    this.hasSingInEmiter.next(this.authState);
  }

  setState(state: AuthState) {
    this.authState = state;
    this.hasSingInEmiter.next(this.authState);
  }
}
