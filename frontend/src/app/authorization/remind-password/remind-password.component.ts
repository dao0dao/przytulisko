import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { HttpRemindPasswordService } from './http-remind-password.service';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss'],
})
export class RemindPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private httpRemindPassword: HttpRemindPasswordService
  ) {}

  svgLink = svgLink;
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  getField(fieldName: string) {
    return this.registerForm.get(fieldName);
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    const data = { email: this.getField('email')?.value };
    this.httpRemindPassword.remindPassword(data).subscribe({
      next: () => {
        console.log('przypomnienie hasła');
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
