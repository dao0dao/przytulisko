import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LINK } from './environment';

@Injectable({
  providedIn: 'root',
})
export class AppHttpService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(API_LINK(), { responseType: 'text' });
  }
}
