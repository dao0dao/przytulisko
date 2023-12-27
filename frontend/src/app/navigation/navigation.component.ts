import { Component } from '@angular/core';
import { svgLink } from '../utilities';
import { animations } from './animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: animations,
})
export class NavigationComponent {
  svgLink = svgLink;
  isNavigationOpen: boolean = false;

  toggleNavigation() {
    this.isNavigationOpen = !this.isNavigationOpen;
  }
}
