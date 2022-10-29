import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  hide = true;

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required'))
      return 'Ce champ est requis';

    return 'Ce champ contient une erreur';
  }

  onSubmitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const val = this.loginForm.value;
    this.auth.login({ email: val.email!, password: val.password! }).pipe(
      tap((_user) => {
        this.router.navigateByUrl('/')
      }),
      catchError(() => {
        this.loading = false;
        return of();
      })
    ).subscribe();
  }
}
