import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HabitFormGroupType } from '../../types/habit-form-group.type';
import { HabitsStore } from '../../store/habits.store';
import { HabitType } from '../../types/habit.type';

export type HabitDialogDataType = {
  type: 'add' | 'edit';
  habitData?: HabitType;
};

type WeekDayType = {
  day: string;
  weekDayNumber: number;
  checked: boolean;
};

@Component({
  selector: 'app-add-habit-dialog',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTimepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './habit-dialog.html',
  styleUrl: './habit-dialog.scss',
})
export class HabitDialog {
  private dialogRef = inject(MatDialogRef<HabitDialog>);
  private store = inject(HabitsStore);
  protected habitDialogData = inject<HabitDialogDataType | null>(
    MAT_DIALOG_DATA
  );

  protected habitForm: FormGroup<HabitFormGroupType>;

  protected frequencyRadioSelect = 'D';

  protected weekDays: WeekDayType[] = [
    { day: 'Monday', weekDayNumber: 1, checked: false },
    { day: 'Tuesday', weekDayNumber: 2, checked: false },
    { day: 'Wednesday', weekDayNumber: 3, checked: false },
    { day: 'Thursday', weekDayNumber: 4, checked: false },
    { day: 'Friday', weekDayNumber: 5, checked: false },
    { day: 'Saturday', weekDayNumber: 6, checked: false },
    { day: 'Sunday', weekDayNumber: 7, checked: false },
  ];

  constructor() {
    this.habitForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      shortDescription: new FormControl(''),
      color: new FormControl('cyan'),
    });

    if (this.habitDialogData.type === 'edit') {
      this.habitForm.controls.title.setValue(
        this.habitDialogData.habitData.title
      );
      this.habitForm.controls.shortDescription.setValue(
        this.habitDialogData.habitData.shortDescription
      );
      this.habitForm.controls.color.setValue(
        this.habitDialogData.habitData.color
      );
    }
  }

  saveAndCloseDialog() {
    const encodedFrequency = this.determineEncodedFrequency();

    if (encodedFrequency.length <= 1 && encodedFrequency !== 'D') return;

    if (this.habitForm.invalid) return;

    const habit: HabitType = {
      id: null,
      title: this.habitForm.controls.title.value,
      shortDescription: this.habitForm.controls.shortDescription.value,
      color: this.habitForm.controls.color.value,
      frequency: encodedFrequency,
    };

    console.log(habit);
    console.log(this.weekDays);
    console.log(encodedFrequency);

    switch (this.habitDialogData.type) {
      case 'edit':
        habit.id = this.habitDialogData.habitData.id;

        this.store.updateHabit(habit);
        break;
      case 'add':
      default:
        this.store.addHabit(habit);
        break;
    }

    this.dialogRef.close();
  }

  determineEncodedFrequency(): string {
    let encodedStr = 'D';

    console.log('determineEncodedFrequency fired');

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

    return encodedStr;
  }

  updateWeekDayChecked(newCheckedState: boolean, index: number) {
    this.weekDays[index].checked = newCheckedState;
  }
}
