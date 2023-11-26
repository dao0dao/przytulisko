import { Component, OnInit } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: AppHttpService) {}
  data: any;

  ngOnInit(): void {
    this.http.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
    });
  }

}
