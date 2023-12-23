import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  isNavigationOpen: boolean = false;

  toggleNavigation() {
    this.isNavigationOpen = !this.isNavigationOpen;
  }
}
