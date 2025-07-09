import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function greaterThan(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const greaterThanNum = control.value > num;
    return greaterThanNum ? null : { notGreaterThan: { value: control.value } };
  };
}
