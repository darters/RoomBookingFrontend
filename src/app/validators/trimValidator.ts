import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function trimValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        let isWhiteSpace = (control.value || '').trim().length === 0;
        let isValid = !isWhiteSpace
        return isValid ? null : { whitespace: true }
      }
}

