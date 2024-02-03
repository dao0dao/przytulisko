import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiLink } from 'src/app/utilities';
import { ResetPasswordData } from './reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class HttpResetPasswordService {
  constructor(private http: HttpClient) {}

  remindPassword(data: ResetPasswordData) {
    return this.http.post(apiLink() + 'reset-password', data);
  }
}
