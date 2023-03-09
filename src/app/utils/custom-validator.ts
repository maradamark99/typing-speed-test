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

	public static usernameValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const controlValue = control.value;

			if (control.value == null)
				return null;
			
			const startsWithLetter = /[A-Za-z]/.test(controlValue.charAt(0));
			
			// TODO: implement the rest of the validations
			
			return startsWithLetter ? null : { shouldStartWithLetter: true };
		}
	}

	public static matchingControlValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
		return (form: AbstractControl): ValidationErrors | null => {
			const control = form.get(controlName);
			const matchingControl = form.get(matchingControlName);
			if (!control || !matchingControl)
				return null;
			if (control.value != matchingControl.value)
				matchingControl.setErrors({ notEquivalent: true });
			return control.value == matchingControl.value ? null : { notEquivalent: true };
		}
	}
	
}