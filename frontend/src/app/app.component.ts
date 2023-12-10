import { Component } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: AppHttpService) {
    console.log(window.location)
  }
  data: any;

  click() {
    this.http.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
    });
  }
}
