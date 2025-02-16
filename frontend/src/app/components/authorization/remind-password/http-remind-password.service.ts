import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiLink } from 'src/app/utilities';
import { RemindPasswordData } from './remind-password.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRemindPasswordService {
  constructor(private http: HttpClient) {}

  remindPassword(data: RemindPasswordData) {
    return this.http.post(apiLink() + 'remind-password', data);
  }
}
