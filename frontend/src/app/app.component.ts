import { Component, HostBinding, HostListener } from '@angular/core';
import { InfoModalService } from './infrastructure/services/info-modal.service';
import { appAnimations } from './app-animations';
import { AppHttpService } from './app-http.service';
import { AuthStateService } from './authorization/auth-state.service';
import { NavigationMenuService } from './navigation/navigation-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations,
})
export class AppComponent {
  constructor(
    public infoModal: InfoModalService,
    private http: AppHttpService,
    private authState: AuthStateService,
    public navigationMenu: NavigationMenuService
  ) {
    this.http.isLogin().subscribe({
      next: (state) => {
        this.authState.setState(state);
      },
    });
  }

  @HostBinding('style.height') private hostHeight = window.innerHeight + 'px';
  @HostListener('window:resize') onResize() {
    this.hostHeight = window.innerHeight + 'px';
  }
  data: any;
}
