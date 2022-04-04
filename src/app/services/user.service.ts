import {Injectable} from '@angular/core';

interface IUser {
  username: string,
  password: string,
  passwordConfirm: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public errors = {username: '', password: '', passwordConfirm: ''}
  public userInput: IUser = {username: '', password: '', passwordConfirm: ''}

  constructor() {
  }

  validate() {
    //TODO: Better validation logic
    this.errors.username = ''
    this.errors.password = ''
    this.errors.passwordConfirm = ''
    let counter = 0

    if (this.userInput.username.length < 4){
      this.errors.username = 'Invalid username'
      counter++
    }
    if (this.userInput.password.length < 8){
      this.errors.password = 'Invalid password'
    }
    if (this.userInput.passwordConfirm !== this.userInput.password){
      this.errors.passwordConfirm = 'Passwords do not match'
    }
    return counter
  }
  save(){
    if(this.validate() > 0)
      console.log('Not saving!')
    else{
      console.log('Saving!')
      this.userInput.username = ''
      this.userInput.password = ''
      this.userInput.passwordConfirm = ''
    }
  }

}
