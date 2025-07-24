import { Component, inject, signal } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { HabitsStore } from '../../store/habits.store';
import { FrequencyPicker } from './frequency-picker/frequency-picker';
import { StartEndDatePicker } from './start-end-date-picker/start-end-date-picker';

import { HabitFormGroupType } from '../../types/habit-form-group.type';
import { HabitType } from '../../types/habit.type';
import { HabitDatesType } from '../../types/habit-dates.type';
import { HabitDialogDataType } from '../../types/habit-dialog.type';

import { greaterThan } from '../../shared/greater-than.directive';
import { integerOnly } from '../../shared/integer-only.directive';

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
    MatButtonModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatIconModule,
    MatRadioModule,
    FrequencyPicker,
    StartEndDatePicker,
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

  protected disableSaveButton = signal(true);

  constructor() {
    this.habitForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      shortDescription: new FormControl(''),
      color: new FormControl('cyan'),
      // Initially set to 'R' to prevent ExpressionChangedAfterItHasBeenCheckedError
      frequency: new FormControl('R', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      priority: new FormControl(1, [
        Validators.required,
        integerOnly(),
        greaterThan(0),
      ]),
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

      this.habitForm.controls.startDate.setValue(
        this.habitDialogData.habitData.startDate
      );

      this.habitForm.controls.endDate.setValue(
        this.habitDialogData.habitData.endDate
      );

      this.habitForm.controls.priority.setValue(
        this.habitDialogData.habitData.priority
      );
    }

    this.disableSaveButton.set(this.habitForm.invalid);
  }

  saveAndCloseDialog() {
    if (this.disableSaveButton()) return;

    const habit: HabitType = {
      id: null,
      title: this.habitForm.controls.title.value,
      shortDescription: this.habitForm.controls.shortDescription.value,
      color: this.habitForm.controls.color.value,
      frequency: this.habitForm.controls.frequency.value,
      startDate: this.habitForm.controls.startDate.value,
      endDate: this.habitForm.controls.endDate.value,
      priority: this.habitForm.controls.priority.value,
    };

    console.log(habit);

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

  setFrequency(encodedFrequency: string) {
    this.habitForm.controls.frequency.setValue(encodedFrequency);
  }

  setDates(dates: HabitDatesType) {
    this.habitForm.controls.startDate.setValue(dates.startDate);
    this.habitForm.controls.endDate.setValue(dates.endDate);

    this.disableSaveButton.set(this.habitForm.invalid || !dates.valid);
  }

  onPriorityChange() {
    this.disableSaveButton.set(this.habitForm.invalid);
  }
}
