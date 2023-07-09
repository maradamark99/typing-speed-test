import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormControlDetail } from 'src/app/interfaces/form-control-detail';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  public readonly formControlDetails: IFormControlDetail[] = [
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

  public handleLogin(user: IUser) {
    this.subscription = this.authService.login(user).subscribe({
      next: response => this.tokenService.setToken(response.token),
      error: e => console.log(e),
      complete: () => this.router.navigate(['/']).then()
    });
  }

}
