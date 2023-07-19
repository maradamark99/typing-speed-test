import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

	public static passwordStrengthValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const controlValue = control.value;
			if (!controlValue) {
				return null;
			}
			const hasUpperCase = /[A-Z]+/.test(controlValue);

			const hasLowerCase = /[a-z]+/.test(controlValue);

			const hasNumeric = /[0-9]+/.test(controlValue);

			const isLongEnough = this.isGivenValueLongEnough(controlValue, 8)
			
			const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isLongEnough;

			return !passwordValid ? { customError: "The password is not strong enough."} : null;
		}
	}

	public static usernameValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {

			if (control.value == null)
				return null;

			const controlValue = control.value;
			
			const startsWithLetter = /[A-Za-z]/.test(controlValue.charAt(0));

			const isLongEnough = this.isGivenValueLongEnough(controlValue, 4);

			if (startsWithLetter && isLongEnough)
				return null;

			let errorMessage = "The username ";
			const startsWithLetterMessage = "must start with a letter"
			const isLongEnoughMessage = "has to be at least 4 characters long";

			if (!startsWithLetter && !isLongEnough)
				errorMessage += `${startsWithLetterMessage} and ${isLongEnoughMessage}`;
			else if (!startsWithLetter)
				errorMessage += startsWithLetterMessage;
			else if (!isLongEnough)
				errorMessage += isLongEnoughMessage;
			
			return { customError: errorMessage};
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
				matchingControl.setErrors({ customError: `The fields ${controlName} and ${matchingControlName} do not match.` });
			return null;
		}
	}

	private static isGivenValueLongEnough(value: string, requiredMinLength: number): boolean {
		return value.length >= requiredMinLength;
	}
	
}