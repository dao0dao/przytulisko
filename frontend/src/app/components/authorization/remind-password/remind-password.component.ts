import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { HttpRemindPasswordService } from './http-remind-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss'],
})
export class RemindPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private httpRemindPassword: HttpRemindPasswordService,
    private router: Router
  ) {}

  svgLink = svgLink;
  remindForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  getField(fieldName: string) {
    return this.remindForm.get(fieldName);
  }

  submit() {
    if (this.remindForm.invalid) {
      return;
    }
    const data = { email: this.getField('email')?.value };
    this.httpRemindPassword.remindPassword(data).subscribe({
      next: (data: any) => {
        this.router.navigate(['/remind-password/' + data.location]);
        this.remindForm.reset();
      },
      error: () => {
        this.remindForm.reset();
      },
    });
  }
}
