import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from '../infrastructure/models/pet.model';
import { filter, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpPetsService {
  constructor(private http: HttpClient) {}

  private mockPets: Pet[] = [
    {
      age: 4,
      breed: 'abysyński',
      category: 'cat',
      description:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?',
      gender: 'female',
      id: 'jakies id',
      name: 'Tajga',
      imageUrl: 'https://cdn2.thecatapi.com/images/d56.jpg',
    },
    {
      age: 4,
      breed: 'abysyński',
      category: 'cat',
      description:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?',
      gender: 'female',
      id: 'jakies id2',
      name: 'Leopold',
      imageUrl: 'https://cdn2.thecatapi.com/images/MTUwNDc5Mw.jpg',
    },
    {
      age: 4,
      breed: 'abysyński',
      category: 'cat',
      description:
        'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?',
      gender: 'female',
      id: 'jakies id3',
      name: 'Sajmon',
      imageUrl: 'https://cdn2.thecatapi.com/images/MjA0MTM5OA.jpg',
    },
  ];

  getPets() {
    return of(this.mockPets);
  }

  getCats() {
    return of(this.mockPets).pipe(
      map((pets) => pets.filter((p) => p.category === 'cat'))
    );
  }
  getDogs() {
    return of(this.mockPets).pipe(
      map((pets) => pets.filter((p) => p.category === 'dog'))
    );
  }
}
