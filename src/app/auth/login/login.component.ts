import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControlDetail } from 'src/app/shared/interfaces/form-control-detail';
import { AuthService } from '../../shared/services/auth.service';
import { TokenService } from '../../shared/services/token.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  public readonly formControlDetails: FormControlDetail[] = [
    {
      name: 'username',
      placeholder: 'Username',
      type: 'text',
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
  ];

  constructor(private readonly authService: AuthService, private readonly tokenService: TokenService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public handleLogin(user: User) {
    this.subscription = this.authService.login(user).subscribe({
      next: response => this.tokenService.setToken(response.token),
      error: e => console.log(e),
      complete: () => this.router.navigate(['/']).then()
    });
  }

}
