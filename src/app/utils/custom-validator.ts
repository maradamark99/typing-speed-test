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

			return !passwordValid ? { message: "The password is not strong enough."} : null;
		}
	}

	public static usernameValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {

			const controlValue = control.value;

			if (control.value == null)
				return null;
			
			const startsWithLetter = /[A-Za-z]/.test(controlValue.charAt(0));
						
			return startsWithLetter ? null : { message: "The username must start with a letter."};
		}
	}

	public static matchingControlValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
		return (form: AbstractControl): ValidationErrors | null => {
			const control = form.get(controlName);
			const matchingControl = form.get(matchingControlName);

			if (!control || !matchingControl)
				return null;
			
			const isMatching = control.value === matchingControl.value;
			if (!isMatching)
				matchingControl.setErrors({ message: `The fields ${controlName} and ${matchingControlName} do not match.` });
			return null;
		}
	}
	
}