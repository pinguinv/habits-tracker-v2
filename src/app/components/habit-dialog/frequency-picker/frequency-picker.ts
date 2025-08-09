import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatExpansionModule,
  MatExpansionPanel,
} from '@angular/material/expansion';
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
  readonly frequencyInput = input.required<string>();
  readonly frequencyChangedOutput = output<string>();

  // Shared properties
  protected frequencyRadioSelect = 'D';
  protected encodedFrequency = '';

  // Specific days of the week option
  protected readonly weekDays: WeekDayType[] = getWeekDays();
  protected showWeekError = false;

  // Repeat option
  protected readonly repeatDays = new FormControl(2, [
    Validators.required,
    greaterThan(1),
    integerOnly(),
  ]);
  protected readonly activeDays = new FormControl<number>(null, [
    Validators.required,
    greaterThan(0),
    integerOnly(),
  ]);
  protected readonly restDays = new FormControl<number>(null, [
    Validators.required,
    greaterThan(0),
    integerOnly(),
  ]);
  protected alternateDays = false;

  ngOnInit() {
    // Decode and set initial state
    const encodedFrequencyIn = this.frequencyInput();

    this.frequencyRadioSelect = encodedFrequencyIn[0];

    switch (this.frequencyRadioSelect) {
      case 'W':
        this.decodeStateWeekDays(encodedFrequencyIn);
        break;
      case 'R':
        this.decodeStateRepeat(encodedFrequencyIn);
        break;
      case 'D':
      default:
        this.frequencyRadioSelect = 'D';
    }
  }

  protected emitEncodedFrequency() {
    this.encodedFrequency = this.determineEncodedFrequency();
    this.frequencyChangedOutput.emit(this.encodedFrequency);
  }

  protected setFrequencyRadioSelect(selected: string) {
    this.frequencyRadioSelect = selected;
    this.emitEncodedFrequency();
  }

  protected updateWeekDayChecked(newCheckedState: boolean, index: number) {
    this.weekDays[index].checked = newCheckedState;
    this.showWeekError = true;
    this.emitEncodedFrequency();
  }

  protected preventClosingCurrentPanel(
    expansionPanel: MatExpansionPanel,
    selected: string
  ) {
    if (this.frequencyRadioSelect === selected) {
      expansionPanel.open();
    }
  }

  private decodeStateWeekDays(encodedFrequency: string): void {
    const weekDaysNums: string[] = encodedFrequency.substring(1).split(',');

    for (const weekDayNumStr of weekDaysNums) {
      const weekDayIndex = parseInt(weekDayNumStr);

      this.weekDays[weekDayIndex].checked = true;
    }
  }

  private decodeStateRepeat(encodedFrequency: string): void {
    this.alternateDays = encodedFrequency[1] === 'A';

    if (this.alternateDays) {
      // Alternate days option selected
      const alternatingDays: string[] = encodedFrequency
        .substring(2)
        .split(',');

      this.activeDays.setValue(parseInt(alternatingDays[0]));
      this.restDays.setValue(parseInt(alternatingDays[1]));
    } else {
      // Repeat option selected
      const repeatDays = encodedFrequency.substring(2);
      this.repeatDays.setValue(parseInt(repeatDays));
    }
  }

  private determineEncodedFrequency(): string {
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

    // Empty string if not valid, encoded frequency if valid
    return isValid ? encodedStr : '';
  }
}
