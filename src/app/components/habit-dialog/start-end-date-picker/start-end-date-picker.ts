import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import moment from 'moment';

import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';

import { integerOnly } from '../../../shared/integer-only.directive';
import { greaterThan } from '../../../shared/greater-than.directive';
import { HabitDatesType } from '../../../types/habit-dates.type';

@Component({
  selector: 'app-start-end-date-picker',
  imports: [
    CommonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './start-end-date-picker.html',
  styleUrl: './start-end-date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartEndDatePicker implements OnInit {
  readonly datesInput = input<HabitDatesType>();
  readonly datesChangedOutput = output<HabitDatesType>();

  protected readonly startDateSelected = new FormControl<moment.Moment>(
    // Creating new Moment in this way is necessary to prevent bug
    // - when user wants to add a new habit and selects endDate
    // without changing startDate, the duration is miscalculated
    // by one day.
    moment(moment().format('YYYY-MM-DD')),
    [Validators.required]
  );
  protected readonly endDateSelected = new FormControl<moment.Moment>(null, []);
  protected readonly isEndDateEnabled = new FormControl<boolean>(false);
  protected readonly duration = new FormControl<number>(null, [
    integerOnly(),
    greaterThan(0),
  ]);

  protected readonly minEndDate = signal<moment.Moment>(null);

  ngOnInit() {
    // Set initial state if provided
    if (this.datesInput() !== null) {
      const initialStartDate = moment(this.datesInput().startDate);
      const initialEndDate: moment.Moment | null =
        this.datesInput().endDate !== ''
          ? moment(this.datesInput().endDate)
          : null;

      this.startDateSelected.setValue(initialStartDate);
      this.startDateSelected.markAsTouched();

      const initialMinEndDate = initialStartDate.clone().add(1, 'day');

      this.minEndDate.set(initialMinEndDate);

      if (initialEndDate) {
        this.isEndDateEnabled.setValue(true);

        this.endDateSelected.setValue(initialEndDate);
        this.endDateSelected.markAsTouched();

        this.updateDuration();
        this.duration.markAsTouched();
      }
    }

    // Initially call to set the minEndDate
    // and emit date value to parent component
    this.onStartDateChanged();
  }

  protected openDatePicker(datePicker: MatDatepicker<unknown>) {
    datePicker.touchUi = false;

    if (window.innerWidth <= 540) datePicker.touchUi = true;

    datePicker.open();
  }

  protected setIsEndDateEnabled(enabled: boolean) {
    this.isEndDateEnabled.setValue(enabled);

    if (enabled) {
      this.endDateSelected.addValidators([Validators.required]);
      this.duration.addValidators([Validators.required]);
    } else {
      this.endDateSelected.removeValidators([Validators.required]);
      this.duration.removeValidators([Validators.required]);
    }

    this.emitChangedDates();
  }

  protected onStartDateChanged() {
    if (this.startDateSelected.invalid) {
      this.emitChangedDates(true);
      return;
    }

    this.updateMinEndDate();
    this.updateDuration();

    this.emitChangedDates();
  }

  protected onEndDateChanged() {
    if (this.endDateSelected.invalid) {
      this.duration.setValue(null);
      this.emitChangedDates(true);
      return;
    }

    this.updateDuration();

    this.emitChangedDates();
  }

  protected onDurationChanged() {
    if (this.duration.invalid) {
      this.endDateSelected.setValue(null);
      this.emitChangedDates(true);
      return;
    }

    this.updateEndDate();

    this.emitChangedDates();
  }

  private updateMinEndDate() {
    const updatedMinEndDate = this.startDateSelected.value
      .clone()
      .add(1, 'day');

    this.minEndDate.set(updatedMinEndDate);
  }

  private updateEndDate() {
    const updatedEndDate = this.startDateSelected.value
      .clone()
      .add(this.duration.value, 'days');

    this.endDateSelected.setValue(updatedEndDate);
    this.endDateSelected.markAsTouched();
  }

  private updateDuration() {
    if (this.endDateSelected.value === null) return;

    const difference = this.endDateSelected.value.diff(
      moment(this.startDateSelected.value),
      'days'
    );

    this.duration.setValue(difference);
    this.duration.markAsTouched();
  }

  private emitChangedDates(emitInvalid?: boolean) {
    if (emitInvalid) {
      this.datesChangedOutput.emit({
        valid: false,
        startDate: '',
        endDate: '',
      });
    }

    const startDateValid = this.startDateSelected.valid;
    const endDateValid = this.endDateSelected.valid && this.duration.valid;

    const datesValid = this.isEndDateEnabled.value
      ? startDateValid && endDateValid
      : startDateValid;

    const newDates: HabitDatesType = {
      valid: datesValid,
      startDate: datesValid
        ? this.startDateSelected.value.format('YYYY-MM-DD')
        : '',
      endDate:
        datesValid && this.isEndDateEnabled.value
          ? this.endDateSelected.value.format('YYYY-MM-DD')
          : '',
    };

    this.datesChangedOutput.emit(newDates);
  }
}
