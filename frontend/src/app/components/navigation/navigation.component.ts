import { Component, OnDestroy } from '@angular/core';
import { svgLink } from '../../utilities';
import { animations } from './animations';
import { HttpLoginService } from '../authorization/login/http-login.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NavigationMenuService } from './navigation-menu.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../types/app.state.interface';
import { isLoginSelector, loginUserNameSelector } from '../../store/authorization/selectors';
import * as AuthActions from 'src/app/store/authorization/actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: animations,
})
export class NavigationComponent implements OnDestroy {
  constructor(
    private http: HttpLoginService,
    private router: Router,
    private navigationService: NavigationMenuService,
    private store: Store<AppStateInterface>
  ) {
    const s = this.navigationService.closeMenu$.subscribe({
      next: () => {
        this.isNavigationOpen = false;
        this.isProfileOpen = false;
      },
    });
    const s1 = this.store.pipe(select(isLoginSelector)).subscribe({
      next: (isLogin) => {
        isLogin ? this.router.navigate(['/']) : null;
      },
    });
    this.subscriptions.push(s, s1);
    this.isLogin$ = this.store.pipe(select(isLoginSelector));
    this.username$ = this.store.pipe(select(loginUserNameSelector))
  }
  isLogin$: Observable<boolean>;
  username$: Observable<string>;
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
    this.closeProfile();
    this.store.dispatch(AuthActions.logoutUser());
  }
}
