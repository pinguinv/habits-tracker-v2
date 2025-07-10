import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { greaterThan } from '../../../shared/greater-than.directive';
import { integerOnly } from '../../../shared/integer-only.directive';

type WeekDayType = {
  day: string;
  weekDayNumber: number;
  checked: boolean;
};

@Component({
  selector: 'app-frequency-picker',
  imports: [
    CommonModule,
    MatRadioModule,
    MatStepperModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  templateUrl: './frequency-picker.html',
  styleUrl: './frequency-picker.scss',
})
export class FrequencyPicker implements OnInit {
  public frequencyInput = input<string>('');
  protected frequencyOutput = output<string>();

  protected frequencyRadioSelect = 'D';
  protected encodedFrequency = '';

  // specific days of the week option
  protected weekDays: WeekDayType[] = [
    { day: 'Monday', weekDayNumber: 1, checked: false },
    { day: 'Tuesday', weekDayNumber: 2, checked: false },
    { day: 'Wednesday', weekDayNumber: 3, checked: false },
    { day: 'Thursday', weekDayNumber: 4, checked: false },
    { day: 'Friday', weekDayNumber: 5, checked: false },
    { day: 'Saturday', weekDayNumber: 6, checked: false },
    { day: 'Sunday', weekDayNumber: 7, checked: false },
  ];
  protected showWeekError = false;

  // repeat option
  protected alternateDays = false;
  protected repeatDays = new FormControl(2, [
    Validators.required,
    greaterThan(1),
    integerOnly(),
  ]);
  protected activeDays = new FormControl<number>(null, [
    Validators.required,
    greaterThan(0),
    integerOnly(),
  ]);
  protected restDays = new FormControl<number>(null, [
    Validators.required,
    greaterThan(0),
    integerOnly(),
  ]);

  ngOnInit() {
    // decode and set initial state
    const encodedFrequencyIn = this.frequencyInput();

    this.frequencyRadioSelect = encodedFrequencyIn[0];

    switch (this.frequencyRadioSelect) {
      case 'D':
        break;
      case 'W':
        this.decodeStateWeekDays(encodedFrequencyIn);
        break;
      case 'R':
        this.decodeStateRepeat(encodedFrequencyIn);
        break;
      default:
        this.frequencyRadioSelect = 'D';
    }
  }

  decodeStateWeekDays(encodedFrequency: string): void {
    const weekDays: string[] = encodedFrequency.substring(1).split(',');

    for (const weekDayNumStr of weekDays) {
      const weekDayIndex = parseInt(weekDayNumStr) - 1;

      this.weekDays[weekDayIndex].checked = true;
    }
  }

  decodeStateRepeat(encodedFrequency: string): void {
    this.alternateDays = encodedFrequency[1] === 'A';

    if (this.alternateDays) {
      const alternatingDays: string[] = encodedFrequency
        .substring(2)
        .split(',');

      this.activeDays.setValue(parseInt(alternatingDays[0]));
      this.restDays.setValue(parseInt(alternatingDays[1]));
    } else {
      // encodedOptions === 'R'
      const repeatDays = encodedFrequency.substring(2);
      this.repeatDays.setValue(parseInt(repeatDays));
    }
  }

  emitEncodedFrequency() {
    this.encodedFrequency = this.determineEncodedFrequency();
    this.frequencyOutput.emit(this.encodedFrequency);
  }

  determineEncodedFrequency(): string {
    let encodedStr = 'D';
    let isValid = false;

    switch (this.frequencyRadioSelect) {
      case 'W':
        encodedStr = 'W';

        for (const day of this.weekDays) {
          if (day.checked) encodedStr += `${day.weekDayNumber},`;
        }

        if (encodedStr.length > 1)
          encodedStr = encodedStr.substring(0, encodedStr.length - 1);

        isValid = encodedStr.length > 1;

        break;

      case 'R':
        encodedStr = 'R';
        isValid = false;

        if (this.alternateDays) {
          encodedStr += `A${this.activeDays.value},${this.restDays.value}`;
          isValid =
            this.activeDays.value > 0 &&
            this.restDays.value > 0 &&
            this.activeDays.valid &&
            this.restDays.valid;

          break;
        }

        encodedStr += `R${this.repeatDays.value}`;
        isValid = this.repeatDays.value > 1 && this.repeatDays.valid;

        break;

      case 'D':
        isValid = true;
        break;

      default:
        isValid = false;
    }

    // '' if not valid
    // anything if valid.
    return isValid ? encodedStr : '';
  }

  setFrequencyRadioSelect(selected: string) {
    this.frequencyRadioSelect = selected;
    this.emitEncodedFrequency();
  }

  updateWeekDayChecked(newCheckedState: boolean, index: number) {
    this.weekDays[index].checked = newCheckedState;
    this.showWeekError = true;
    this.emitEncodedFrequency();
  }
}
