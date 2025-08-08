import { FormControl, FormGroup } from '@angular/forms';

export type StepsFormGroupType = {
  firstStep: FormGroup<{
    color: FormControl<string>;
  }>;
  secondStep: FormGroup<{
    title: FormControl<string>;
    evalMethod: FormControl<string>;
    shortDescription: FormControl<string>;
  }>;
  thirdStep: FormGroup<{
    frequency: FormControl<string>;
  }>;
  fourthStep: FormGroup<{
    startDate: FormControl<string>;
    priority: FormControl<number>;
    endDate: FormControl<string>;
  }>;
};
