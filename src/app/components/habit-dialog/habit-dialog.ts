import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
import { HabitEvalMethodDetails } from './habit-eval-method-details/habit-eval-method-details';

import { StepsFormGroupType } from '../../types/steps-form-group.type';
import { HabitType } from '../../types/habit.type';
import { HabitDatesType } from '../../types/habit-dates.type';
import { HabitDialogDataType } from '../../types/habit-dialog.type';
import { pickedEvalMethodType } from '../../types/picked-eval-method.type';

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
    HabitEvalMethodDetails,
  ],
  templateUrl: './habit-dialog.html',
  styleUrl: './habit-dialog.scss',
})
export class HabitDialog {
  private readonly dialogRef = inject(MatDialogRef<HabitDialog>);
  private readonly store = inject(HabitsStore);
  protected readonly habitDialogData = inject<HabitDialogDataType | null>(
    MAT_DIALOG_DATA
  );

  private readonly formBuilder = inject(FormBuilder);

  protected readonly stepsForm: FormGroup<StepsFormGroupType>;

  protected readonly disableSaveButton = signal(true);
  protected readonly evalMethodRadioValue =
    signal<pickedEvalMethodType>('YesNo');

  constructor() {
    this.stepsForm = this.formBuilder.group({
      firstStep: this.formBuilder.group({
        color: ['cyan'],
      }),
      secondStep: this.formBuilder.group({
        title: ['', [Validators.required]],
        evalMethod: ['', [Validators.required]],
        shortDescription: [''],
      }),
      thirdStep: this.formBuilder.group({
        frequency: ['R', [Validators.required]],
      }),
      fourthStep: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        priority: [1, [Validators.required, integerOnly(), greaterThan(0)]],
        endDate: [''],
      }),
    });

    if (this.habitDialogData.type === 'edit') {
      this.loadHabitDataToForm();
    }

    this.disableSaveButton.set(this.stepsForm.invalid);
  }

  protected saveAndCloseDialog() {
    if (this.disableSaveButton()) return;

    const habit: HabitType = {
      id: null,
      color: this.stepsForm.controls.firstStep.controls.color.value,

      title: this.stepsForm.controls.secondStep.controls.title.value,
      evalMethod: this.stepsForm.controls.secondStep.controls.evalMethod.value,
      shortDescription:
        this.stepsForm.controls.secondStep.controls.shortDescription.value,

      frequency: this.stepsForm.controls.thirdStep.controls.frequency.value,

      startDate: this.stepsForm.controls.fourthStep.controls.startDate.value,
      priority: this.stepsForm.controls.fourthStep.controls.priority.value,
      endDate: this.stepsForm.controls.fourthStep.controls.endDate.value,
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

  protected setFrequency(encodedFrequency: string) {
    this.stepsForm.controls.thirdStep.controls.frequency.setValue(
      encodedFrequency
    );
  }

  protected setDates(dates: HabitDatesType) {
    this.stepsForm.controls.fourthStep.controls.startDate.setValue(
      dates.startDate
    );
    this.stepsForm.controls.fourthStep.controls.endDate.setValue(dates.endDate);

    this.disableSaveButton.set(this.stepsForm.invalid || !dates.valid);
  }

  protected onPriorityChange() {
    this.disableSaveButton.set(this.stepsForm.invalid);
  }

  protected setEvalMethod(encodedEvalMethod: string) {
    this.stepsForm.controls.secondStep.controls.evalMethod.setValue(
      encodedEvalMethod
    );
    this.disableSaveButton.set(this.stepsForm.invalid);
  }

  private loadHabitDataToForm() {
    this.stepsForm.controls.firstStep.controls.color.setValue(
      this.habitDialogData.habitData.color
    );

    this.stepsForm.controls.secondStep.controls.title.setValue(
      this.habitDialogData.habitData.title
    );

    this.stepsForm.controls.secondStep.controls.evalMethod.setValue(
      this.habitDialogData.habitData.evalMethod
    );

    this.stepsForm.controls.secondStep.controls.shortDescription.setValue(
      this.habitDialogData.habitData.shortDescription
    );

    this.stepsForm.controls.fourthStep.controls.startDate.setValue(
      this.habitDialogData.habitData.startDate
    );

    this.stepsForm.controls.fourthStep.controls.priority.setValue(
      this.habitDialogData.habitData.priority
    );

    this.stepsForm.controls.fourthStep.controls.endDate.setValue(
      this.habitDialogData.habitData.endDate
    );

    switch (this.habitDialogData.habitData.evalMethod[0]) {
      case 'N':
        this.evalMethodRadioValue.set('Numeric');
        break;

      case 'T':
        this.evalMethodRadioValue.set('Timer');
        break;

      case 'B':
      default:
        this.evalMethodRadioValue.set('YesNo');
    }
  }
}
