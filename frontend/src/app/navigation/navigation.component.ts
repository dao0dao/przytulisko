import { Component } from '@angular/core';
import { svgLink } from '../utilities';
import { animations } from './animations';
import { AuthStateService } from '../authorization/auth-state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: animations,
})
export class NavigationComponent {
  constructor(public authState: AuthStateService) {}
  svgLink = svgLink;
  isNavigationOpen: boolean = false;
  isProfileOpen: boolean = false;

  toggleNavigation() {
    this.closeProfile();
    this.isNavigationOpen = !this.isNavigationOpen;
  }

  closeNavigation() {
    this.isNavigationOpen = false;
  }

  toggleProfile() {
    this.closeNavigation();
    this.isProfileOpen = !this.isProfileOpen;
  }

  closeProfile() {
    this.isProfileOpen = false;
  }
}
