import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { MatError } from '@angular/material/form-field';

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
    MatError,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './frequency-picker.html',
  styleUrl: './frequency-picker.scss',
})
export class FrequencyPicker {
  protected frequencyOutput = output<string>();

  protected weekDays: WeekDayType[] = [
    { day: 'Monday', weekDayNumber: 1, checked: false },
    { day: 'Tuesday', weekDayNumber: 2, checked: false },
    { day: 'Wednesday', weekDayNumber: 3, checked: false },
    { day: 'Thursday', weekDayNumber: 4, checked: false },
    { day: 'Friday', weekDayNumber: 5, checked: false },
    { day: 'Saturday', weekDayNumber: 6, checked: false },
    { day: 'Sunday', weekDayNumber: 7, checked: false },
  ];

  protected frequencyRadioSelect = 'D';
  protected encodedFrequency = '';
  protected showWeekError = false;

  emitEncodedFrequency() {
    // '' if not valid
    // anything if valid.
    this.encodedFrequency = this.determineEncodedFrequency();
    this.frequencyOutput.emit(this.encodedFrequency);
  }

  determineEncodedFrequency(): string {
    let encodedStr = 'D';

    switch (this.frequencyRadioSelect) {
      case 'W':
        encodedStr = 'W';

        for (const day of this.weekDays) {
          if (day.checked) encodedStr += `${day.weekDayNumber},`;
        }

        if (encodedStr.length > 1)
          encodedStr = encodedStr.substring(0, encodedStr.length - 1);

        break;

      case 'R':
        encodedStr = 'R';
        break;

      case 'D':
      default:
        break;
    }

    return encodedStr === 'D' || encodedStr.length > 1 ? encodedStr : '';
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
