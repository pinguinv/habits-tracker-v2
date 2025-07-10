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
import { getWeekDays } from '../../../shared/week-days';
import { WeekDayType } from '../../../types/week-day.type';

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
  protected showWeekError = false;
  protected weekDays: WeekDayType[] = getWeekDays();

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
    const weekDaysNums: string[] = encodedFrequency.substring(1).split(',');

    for (const weekDayNumStr of weekDaysNums) {
      const weekDayIndex = parseInt(weekDayNumStr);

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

        for (let i = 0; i < this.weekDays.length; i++) {
          const day = this.weekDays[i];
          if (day.checked) encodedStr += `${i},`;
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
