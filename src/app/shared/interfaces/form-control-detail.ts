import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface FormControlDetail {
    name: string,
    placeholder?: string,
    type: string,
    validators?: ((control: AbstractControl<any, any>) => ValidationErrors | null)[],
    saveValue?: boolean
}