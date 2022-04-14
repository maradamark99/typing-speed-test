import {Optional} from "@angular/core";

export interface IUser {
  email: string,
  username: string,
  password: string,
  passwordConfirm?: string,
}
