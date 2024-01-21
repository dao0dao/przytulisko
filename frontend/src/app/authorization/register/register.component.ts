import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { svgLink } from 'src/app/utilities';
import { HttpRegisterService } from './http-register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  constructor(private fb: FormBuilder, private http: HttpRegisterService) {
    const s = this.registerForm.valueChanges.subscribe({
      next: () => {
        if (
          this.getField('password')?.value !==
          this.getField('passwordConfirm')?.value
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
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    ],
    passwordConfirm: ['', [Validators.required]],
  });
  isSamePasswords: boolean = false;

  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }

  getField(fieldName: string) {
    return this.registerForm.get(fieldName);
  }

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    const data = {
      email: this.getField('email')?.value!,
      password: this.getField('password')?.value!,
      passwordConfirm: this.getField('passwordConfirm')?.value!,
    };
    this.http.register(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
