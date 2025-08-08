import { Component, effect, input, output, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatInputModule } from '@angular/material/input';

import { TimePeriodPickerInput } from './time-period-picker-input/time-period-picker-input';
import { TimePeriodData } from '../../../../shared/time-period-data';

@Component({
  selector: 'app-time-period-picker',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TimePeriodPickerInput,
  ],
  templateUrl: './time-period-picker.html',
  styleUrl: './time-period-picker.scss',
})
export class TimePeriodPicker {
  public readonly disable = input<boolean>();
  public readonly timePeriodInput = input<string | null>();
  public readonly timePeriodValue = output<string>();
  protected readonly timePeriodFormControl = new FormControl<TimePeriodData>(
    null,
    [Validators.required]
  );

  constructor() {
    this.timePeriodFormControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.timePeriodValue.emit(
          value ? `${value.hours}:${value.minutes}:${value.seconds}` : null
        );
      });

    effect(() => {
      const timePeriodInputStr = this.timePeriodInput();

      if (!timePeriodInputStr || timePeriodInputStr === '0') return;

      untracked(() => {
        const timePeriodArr: string[] = timePeriodInputStr.split(':');

        this.timePeriodFormControl.setValue(
          new TimePeriodData(
            timePeriodArr[0],
            timePeriodArr[1],
            timePeriodArr[2]
          )
        );
      });
    });

    effect(() => {
      if (this.disable()) this.timePeriodFormControl.disable();
      else this.timePeriodFormControl.enable();
    });
  }
}
