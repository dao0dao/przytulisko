import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { mergeMap, of, take } from 'rxjs';
import { HttpPetsService } from 'src/app/http-services/http-pets.service';
import { Pet } from 'src/app/infrastructure/models/pet.model';
import { newPet, redirectToRoot } from 'src/app/infrastructure/symbols';
import { svgLink } from 'src/app/utilities';

@Component({
  selector: 'app-pet-add-edit',
  templateUrl: './pet-add-edit.component.html',
  styleUrls: ['./pet-add-edit.component.scss'],
})
export class PetAddEditComponent {
  constructor(
    private snapshot: ActivatedRoute,
    private http: HttpPetsService,
    private router: Router
  ) {
    this.snapshot.params
      .pipe(
        take(1),
        mergeMap((params) => {
          if ('edit' === params['action'] && params['id']) {
            return this.http.getPetById(params['id']);
          }
          if ('add' === params['action']) {
            return of(newPet);
          }
          return of(redirectToRoot);
        })
      )
      .subscribe({
        next: (pet) => {
          if (redirectToRoot === pet) {
            this.router.navigate(['/']);
            return;
          }
          if (newPet === pet) {
            this.action = 'add';
            return;
          }
          this.pet = pet;
          this.petName = pet.name
        },
      });
  }

  svgLink = svgLink;
  action: 'add' | 'edit' | undefined;
  pet: Pet | undefined;
  petName: string =''
}
