import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LINK } from './environment';
import { AuthState } from './authorization/authorization.model';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(API_LINK(), { responseType: 'text' });
  }

  isLogin() {
    return this.http.get<AuthState>(API_LINK() + '/session');
  }
}
