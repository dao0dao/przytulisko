import { Component, OnDestroy } from '@angular/core';
import { svgLink } from '../utilities';
import { animations } from './animations';
import { AuthStateService } from '../authorization/auth-state.service';
import { HttpLoginService } from '../authorization/login/http-login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationMenuService } from './navigation-menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: animations,
})
export class NavigationComponent implements OnDestroy {
  constructor(
    public authState: AuthStateService,
    private http: HttpLoginService,
    private router: Router,
    private navigationService: NavigationMenuService
  ) {
    const s = this.navigationService.closeMenu$.subscribe({
      next: () => {
        this.isNavigationOpen = false;
        this.isProfileOpen = false;
      },
    });
    this.subscriptions.push(s);
  }

  svgLink = svgLink;
  isNavigationOpen: boolean = false;
  isProfileOpen: boolean = false;
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

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

  logOut() {
    this.http.logOut().subscribe({
      next: () => {
        this.closeProfile();
        this.authState.signOut();
        this.router.navigate(['/']);
      },
      error: () => {
        this.closeProfile();
        this.authState.signOut();
        this.router.navigate(['/']);
      },
    });
  }
}
