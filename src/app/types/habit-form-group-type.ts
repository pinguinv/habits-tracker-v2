import { FormControl } from '@angular/forms';

export type HabitFormGroupType = {
  title: FormControl<string>;
  shortDescription: FormControl<string>;
  howOften: FormControl<string>;
  howManyTimesPerPeriod: FormControl<number>;
  hourOfTheDay: FormControl<Date>;
  durationTime: FormControl<number>;
  setReminder: FormControl<boolean>;
  color: FormControl<string>;
};
