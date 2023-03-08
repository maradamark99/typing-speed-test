import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

	public static passwordStrengthValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const value = control.value;
			if (!value) {
				return null;
			}
			const hasUpperCase = /[A-Z]+/.test(value);

			const hasLowerCase = /[a-z]+/.test(value);

			const hasNumeric = /[0-9]+/.test(value);
			
			const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

			return !passwordValid ? { passwordStrength: true } : null;
		}
	}

	public static matchingControlsValidator(controlName: string, matchingControlName: string): ValidatorFn {
		return (form: AbstractControl): ValidationErrors | null => {
			const control = form.get(controlName)?.value;
			const matchingControl = form.get(matchingControlName)?.value;
			if (!(control && matchingControl))
				return null;
			return control == matchingControl ? null : { notEquivavent: true };
		}
	}
}