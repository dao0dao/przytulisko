import { Component } from '@angular/core';
import { svgLink } from 'src/app/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  svgLink = svgLink;
}
