import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FormControlDetail } from '../../shared/interfaces/form-control-detail';
import { User } from 'src/app/shared/interfaces/user';
import { CustomValidator } from 'src/app/shared/utils/custom-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  private subscription?: Subscription;

  public readonly formControlDetails: FormControlDetail[] = [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      validators: [Validators.email],
    },
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      validators: [CustomValidator.usernameValidator()],
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      validators: [
        CustomValidator.passwordStrengthValidator()
      ],
    },
    {
      name: 'passwordConfirmation',
      placeholder: 'Password confirmation',
      type: 'password',
      validators: [Validators.required],
      saveValue: false
    },
  ];
  public readonly formValidators: ValidatorFn[] =
    [CustomValidator.matchingControlValuesValidator('password', 'passwordConfirmation')];

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  handleRegistration(user: User): void {
    this.subscription = this.authService.register(user).subscribe({
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['/login'])
    });
  }

}
