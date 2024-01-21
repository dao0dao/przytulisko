import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiLink } from 'src/app/utilities';
import { RegisterData } from './register.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRegisterService {
  constructor(private http: HttpClient) {}

  register(data: RegisterData) {
    return this.http.post(apiLink() + 'register', data);
  }
}
