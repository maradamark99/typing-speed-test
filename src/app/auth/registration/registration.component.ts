import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/utils/custom-validator';
import { IFormControlDetail } from '../../interfaces/form-control-detail';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  private subscription?: Subscription;

  public readonly formControlDetails: IFormControlDetail[] = [
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      validators: [Validators.required, Validators.email, Validators.maxLength(255)],
    },
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
      validators: [Validators.minLength(4), Validators.maxLength(255), CustomValidator.usernameValidator()],
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      validators: [
        Validators.minLength(8),
        Validators.maxLength(255),
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
  public readonly formValidators: CustomValidator[] =
    [CustomValidator.matchingControlValuesValidator('password', 'passwordConfirmation')];

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  handleRegistrationFormSubmitted(user: IUser) {
    this.subscription = this.authService.registerUser(user).subscribe({
      error: (e) => console.error(e),
      complete: () => this.redirectToLogin()
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
