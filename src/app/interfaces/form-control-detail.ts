import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface IFormControlDetail {
    name: string,
    placeholder?: string,
    type: string,
    validators?: ((control: AbstractControl<any, any>) => ValidationErrors | null)[],
    saveValue?: boolean
}