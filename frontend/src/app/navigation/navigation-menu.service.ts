import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationMenuService {
  constructor() {}
  private closeMenuSubject = new Subject<undefined>();
  public closeMenu$ = this.closeMenuSubject.asObservable();

  closeMenu() {
    this.closeMenuSubject.next(undefined);
  }
}
