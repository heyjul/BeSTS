import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfirmValidParentMatcher } from '../../validators/confirm-equal.matcher';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  hidePassword = true;
  hideConfirmPassword = true;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  createAccountForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }, {
    validators: [confirmEqualValidator('password', 'confirmPassword')],
    updateOn: 'blur'
  });

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  onSubmitForm() {
    if (!this.createAccountForm.valid)
      return;

    const formValues = this.createAccountForm.value;
    const registration = {
      email: formValues.email!,
      username: formValues.username!,
      password: formValues.password!
    }
    this.auth.register(registration).subscribe(_ => this.router.navigateByUrl('/login'));
  }
}
