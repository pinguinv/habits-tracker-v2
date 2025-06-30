import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

import { HabitFormGroupType } from '../../types/habit-form-group.type';
import { HabitsStore } from '../../store/habits.store';
import { HabitType } from '../../types/habit.type';

@Component({
  selector: 'app-add-habit-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTimepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
  templateUrl: './add-habit-dialog.html',
  styleUrl: './add-habit-dialog.scss',
})
export class AddHabitDialog {
  private dialogRef = inject(MatDialogRef<AddHabitDialog>);
  private store = inject(HabitsStore);
  protected habitForm: FormGroup<HabitFormGroupType>;

  constructor() {
    this.habitForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      shortDescription: new FormControl(''),
      color: new FormControl('cyan'),
    });
  }

  saveAndCloseDialog() {
    if (this.habitForm.invalid) return;

    const newHabit: HabitType = {
      id: null,
      title: this.habitForm.controls.title.value,
      shortDescription: this.habitForm.controls.shortDescription.value,
      color: this.habitForm.controls.color.value,
    };

    this.store.addHabit(newHabit);

    this.dialogRef.close();
  }
}
