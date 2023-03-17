import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFormControlDetail } from 'src/app/interfaces/form-control-detail';
import { CustomValidator } from 'src/app/utils/custom-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() title?: string
  @Input() formControlDetails?: IFormControlDetail[];
  @Input() redirectLink?: string;
  @Input() redirectRoute?: string;
  @Input() addSeparator?: boolean;
  @Input() formValidators?: CustomValidator[];
  @Output() formSubmitted = new EventEmitter<any>();
  public form?: FormGroup 

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  handleSubmit(): void {
    if (this.form?.invalid) {
      this.snackBar.open("Errors in input", "dismiss", {duration: 3000});
      return;
    }
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

    this.form = this.formBuilder.group(group,
      { validators: [...this.formValidators ?? []]} as AbstractControlOptions);
  }

  get fc() {
    return this.form?.controls
  }

}
