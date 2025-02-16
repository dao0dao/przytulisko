import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LINK } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class HttpHomeService {
  constructor(private http: HttpClient) {}

  getCats() {
    return this.http.get(API_LINK() + '/cats');
  }

  getDogs() {
    return this.http.get(API_LINK() + '/dogs');
  }
}
