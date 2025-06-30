import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

import { HabitFormGroupType } from '../../types/habit-form-group.type';

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
  protected habitFormGroup: FormGroup<HabitFormGroupType>;

  constructor() {
    const initialTimeValue = new Date();
    initialTimeValue.setHours(12, 0, 0);

    this.habitFormGroup = new FormGroup({
      title: new FormControl(''),
      shortDescription: new FormControl(''),
      color: new FormControl('cyan'),
    });
  }
}
