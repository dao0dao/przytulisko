import { Component } from '@angular/core';
import { Pet } from '../infrastructure/models/pet.model';
import { AuthStateService } from '../authorization/auth-state.service';
import { HttpPetsService } from '../http-services/http-pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    public authState: AuthStateService,
    private httpPets: HttpPetsService,
    private router: Router
  ) {
    this.choseCategory();
  }

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
