import { Component, OnInit } from '@angular/core';
import { IFormControlDetail } from 'src/app/interfaces/form-control-detail';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  public handleLoginFormSubmitted(user: IUser) {
    this.authService.loginUser(user).subscribe((result) => console.log(result));
  }

}
