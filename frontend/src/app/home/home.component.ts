import { Component } from '@angular/core';
import { Pet } from '../infrastructure/models/pet.model';
import { HttpPetsService } from '../http-services/http-pets.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { isUserAdminSelector } from '../store/authorization/selectors';
import { Observable } from 'rxjs';
import { AppStateInterface } from '../types/app.state.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private httpPets: HttpPetsService,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
    this.choseCategory();
    this.isAdmin$ = store.pipe(select(isUserAdminSelector));
  }
  isAdmin$: Observable<boolean>;
  pets: Pet[] = [];

  choseCategory() {
    const url = this.router.url;
    switch (url) {
      case '/cats':
        this.httpPets.getCats().subscribe({
          next: (cats) => {
            this.pets = cats;
          },
        });
        break;
      case '/dogs':
        this.httpPets.getDogs().subscribe({
          next: (dogs) => {
            this.pets = dogs;
          },
        });
        break;

      default:
        this.httpPets.getPets().subscribe({
          next: (pets) => {
            this.pets = pets;
          },
        });
        break;
    }
  }
}
