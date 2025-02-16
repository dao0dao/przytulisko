import { Component, HostBinding, HostListener } from '@angular/core';
import { InfoModalService } from './components/infrastructure/services/info-modal.service';
import { appAnimations } from './app-animations';
import { NavigationMenuService } from './components/navigation/navigation-menu.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './types/app.state.interface';
import * as AuthActions from 'src/app/store/authorization/actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: appAnimations,
})
export class AppComponent {
  constructor(
    public infoModal: InfoModalService,
    public navigationMenu: NavigationMenuService,
    private store: Store<AppStateInterface>
  ) {
    this.store.dispatch(AuthActions.checkLoginUser())
  }

  @HostBinding('style.height') private hostHeight = window.innerHeight + 'px';
  @HostListener('window:resize') onResize() {
    this.hostHeight = window.innerHeight + 'px';
  }
  data: any;
}
