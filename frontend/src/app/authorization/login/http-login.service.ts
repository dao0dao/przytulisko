import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from './login.model';
import { apiLink } from 'src/app/utilities';
import { AuthState } from '../authorization.model';


@Injectable({
  providedIn: 'root',
})
export class HttpLoginService {
  constructor(private http: HttpClient) {}

  logIn(data: LoginData) {
    return this.http.post<AuthState>(apiLink() + 'login', data);
  }

  logOut(){
    return this.http.get(apiLink()+ 'logout')
  }
}
