import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormControlDetails } from '../interfaces/form-control-details';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  public form?: FormGroup
  formControls?: IFormControlDetails[];

  constructor(private router: Router, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createFormGroup();
  }


  onSubmit() {
    if (this.form?.invalid) {
      console.log('invalid')
      return;
    }
  }

  private createFormControls(): void {
    this.formControls = [
      {
        name: 'email',
        placeholder: 'Email',
        type: 'email',
        validators: [Validators.required, Validators.email, Validators.maxLength(255)]
      },
      {
        name: 'username',
        placeholder: 'Username',
        type: 'text',
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(255)]
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password',
        validators: [Validators.required, Validators.pattern('/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,30}/')]
      },
      {
        name: 'passwordConf',
        placeholder: 'Password confirmation',
        type: 'password',
        validators: []
      },
    ];
  }

  private createFormGroup(): void {
    const group: any = {};
    for (let control of this.formControls!) {
      group[control.name] = ['', control.validators];
    }
    this.form = this.formBuilder.group(group);
  }

}
