import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {
  constructor(private router: Router){}

  editPet(petId: string){
    this.router.navigate(['/pet/'+petId])
  }
}
