import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFormControlDetails } from 'src/app/interfaces/form-control-details';
import { CustomValidator } from 'src/app/utils/custom-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() title?: string
  @Input() formControlDetails?: IFormControlDetails[];
  @Input() redirectLink?: string;
  @Input() redirectRoute?: string;
  @Input() addSeparator?: boolean;
  @Output() formSubmitted = new EventEmitter<any>();
  public form?: FormGroup 

  constructor( private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  onSubmit() {
    if (this.form?.invalid)
      return;
    let result: any = {};
    this.formControlDetails?.forEach(formControl => {
      if(formControl.saveValue !== false)
        result[formControl.name] = this.form!.controls[formControl.name].value;
    })
    this.formSubmitted.emit(result);
    this.form?.reset();
  }

  private createFormGroup(): void {
    const group: any = {};
    this.formControlDetails?.forEach(
      formControlDetail => group[formControlDetail.name] = new FormControl('', formControlDetail.validators)
    )

    this.form = this.formBuilder.group(group,{ validators: CustomValidator.matchingControlsValidator('password', 'passwordConfirmation') });
  }

}
