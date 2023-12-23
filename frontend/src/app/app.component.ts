import { Component, HostBinding } from '@angular/core';
import { AppHttpService } from './app-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('style.height') readonly hostHeight = window.innerHeight + 'px';
  data: any;

  constructor(private http: AppHttpService) {}
}
