import { Component, HostBinding, HostListener } from '@angular/core';
import { InfoModalService } from './infrastructure/services/info-modal.service';
import { appAnimations } from './app-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations,
})
export class AppComponent {
  constructor(public infoModal: InfoModalService) {}

  @HostBinding('style.height') private hostHeight = window.innerHeight + 'px';
  @HostListener('window:resize') onResize() {
    this.hostHeight = window.innerHeight + 'px';
  }
  data: any;
}
