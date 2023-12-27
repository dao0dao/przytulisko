import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('style.height') private hostHeight = window.innerHeight + 'px';
  @HostListener('window:resize') onResize() {
    this.hostHeight = window.innerHeight + 'px';
  }
  data: any;

  constructor() {}
}
