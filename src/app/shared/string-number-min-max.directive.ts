import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stringNumberMinMax(min: number, max: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const numberValue = parseFloat(control.value);

    if (isNaN(numberValue))
      return { parsingError: { value: isNaN(numberValue) } };

    if (numberValue < min)
      return { smallerThanMin: { value: control.value, min: min } };

    if (numberValue > max)
      return { greaterThanMax: { value: control.value, max: max } };

    return null;
  };
}
