import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { Subscription } from 'rxjs';
import { HttpResetPasswordService } from './http-reset-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordData } from './reset-password.model';
import { InfoModalService } from 'src/app/components/infrastructure/services/info-modal.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  constructor(
    private fb: FormBuilder,
    private httpResetPassword: HttpResetPasswordService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private infoModal: InfoModalService
  ) {
    const s = this.resetForm.valueChanges.subscribe({
      next: () => {
        if (
          this.getField('password')?.value !==
          this.getField('confirmPassword')?.value
        ) {
          this.isSamePasswords = false;
        } else {
          this.isSamePasswords = true;
        }
      },
    });
    this.subscriptions.push(s);
  }

  svgLink = svgLink;
  isSamePasswords: boolean = false;
  resetForm = this.fb.group({
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    confirmPassword: ['', [Validators.required]],
  });

  private subscriptions: Subscription[] = [];

  getField(fieldName: string) {
    return this.resetForm.get(fieldName);
  }

  submit() {
    if (this.resetForm.invalid) {
      return;
    }
    const data: ResetPasswordData = {
      password: this.getField('password')?.value,
      confirmPassword: this.getField('confirmPassword')?.value,
      hash: this.activeRoute.snapshot.params['hash'],
    };
    this.httpResetPassword.remindPassword(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.infoModal.showModal('Zaktualizowano hasło')
      },
      error: () => {
        this.resetForm.reset();
      },
    });
  }
}
