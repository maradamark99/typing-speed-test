import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';
import { CustomValidator } from 'src/app/shared/utils/custom-validator';
import { IFormControlDetail } from '../../shared/interfaces/form-control-detail';

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
  public readonly formValidators: CustomValidator[] =
    [CustomValidator.matchingControlValuesValidator('password', 'passwordConfirmation')];

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  handleRegistration(user: IUser): void {
    this.subscription = this.authService.register(user).subscribe({
      error: (e) => console.error(e),
      complete: () => this.redirectToLogin()
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

}
