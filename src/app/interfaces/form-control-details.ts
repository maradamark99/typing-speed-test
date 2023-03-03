import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface IFormControlDetails {
    name: string,
    placeholder: string,
    type: string,
    validators: ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
}