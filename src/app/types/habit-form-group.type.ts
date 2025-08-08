import { FormControl } from '@angular/forms';

export type HabitFormGroupType = {
  title: FormControl<string>;
  shortDescription: FormControl<string>;
  color: FormControl<string>;
  frequency: FormControl<string>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  priority: FormControl<number>;
  evalMethod: FormControl<string>;
};
