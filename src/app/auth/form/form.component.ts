import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormControlDetail } from 'src/app/shared/interfaces/form-control-detail';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() title?: string;
  @Input() formControlDetails?: FormControlDetail[];
  @Input() redirectMessage?: string;
  @Input() redirectRoute?: string;
  @Input() addSeparator?: boolean;
  @Input() formValidators?: ValidatorFn[];
  @Output() formSubmitted = new EventEmitter<any>();
  public form?: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormGroup();
  }


  handleSubmit(): void {
    let result: any = {};
    this.formControlDetails?.forEach(formControl => {
      if (formControl.saveValue !== false)
        result[formControl.name] = this.form!.controls[formControl.name].value;
    });
    this.formSubmitted.emit(result);
    this.form?.reset();
  }

  private createFormGroup(): void {
    const group: any = {};
    this.formControlDetails?.forEach(
      formControlDetail => group[formControlDetail.name] = new FormControl('', formControlDetail.validators)
    );

    this.form = this.formBuilder.group(group,
      { validators: [...this.formValidators ?? []]} as AbstractControlOptions);
  }

  get fc() {
    return this.form?.controls;
  }

}
