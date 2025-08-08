import { FocusMonitor } from '@angular/cdk/a11y';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  MAT_FORM_FIELD,
  MatFormFieldControl,
} from '@angular/material/form-field';

import { Subject } from 'rxjs';

import { TimePeriodData } from '../../../../../shared/time-period-data';
import { stringNumberMinMax } from '../../../../../shared/string-number-min-max.directive';

type TimePeriodFormType = {
  hours: FormControl<string | null>;
  minutes: FormControl<string | null>;
  seconds: FormControl<string | null>;
};

@Component({
  selector: 'app-time-period-picker-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './time-period-picker-input.html',
  styleUrl: './time-period-picker-input.scss',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => TimePeriodPickerInput),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePeriodPickerInput
  implements
    ControlValueAccessor,
    MatFormFieldControl<TimePeriodData>,
    OnDestroy
{
  static nextId = 0;

  readonly hoursInput = viewChild.required<HTMLInputElement>('hours');
  readonly minutesInput = viewChild.required<HTMLInputElement>('minutes');
  readonly secondsInput = viewChild.required<HTMLInputElement>('seconds');

  ngControl = inject(NgControl, { optional: true, self: true });

  readonly timePeriodPartsForm: FormGroup<TimePeriodFormType>;

  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'time-period-picker-input';
  readonly id = `app-time-period-picker-input-${TimePeriodPickerInput.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'aria-describedby',
  });
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'disabled',
    transform: booleanAttribute,
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(
    () => this._disabledByInput() || this._disabledByCva()
  );
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private focusNextInput = false;
  private currentValue: TimePeriodData | null = null;

  constructor() {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }

    const commonValidators = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ];

    this.timePeriodPartsForm = inject(FormBuilder).group({
      hours: ['00', [...commonValidators, stringNumberMinMax(0, 23)]],
      minutes: ['00', [...commonValidators, stringNumberMinMax(0, 59)]],
      seconds: ['00', [...commonValidators, stringNumberMinMax(0, 59)]],
    });

    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this._disabled();
      this._focused();
      // Propagate state changes.
      untracked(() => this.stateChanges.next());
    });

    // Sync disabled
    effect(() => {
      if (this._disabled()) {
        untracked(() => this.timePeriodPartsForm.disable());
      } else {
        untracked(() => this.timePeriodPartsForm.enable());
      }
    });

    this.timePeriodPartsForm.statusChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.stateChanges.next();
      });

    this.timePeriodPartsForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        const timePeriod = new TimePeriodData(
          value.hours,
          value.minutes,
          value.seconds
        );

        if (!this.isTimePeriodDifferentThanZero(timePeriod))
          this.timePeriodPartsForm.setErrors({ differentThanZero: false });

        if (this.areDifferentTimePeriods(timePeriod, this.currentValue)) {
          this.currentValue = timePeriod;
          this.stateChanges.next();
          this.onChange(this.returnCorrectOrNull());
        }
      });
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  get focused(): boolean {
    return this._focused();
  }

  get empty(): boolean {
    const { hours, minutes, seconds } = this.timePeriodPartsForm.value;
    return !hours && !minutes && !seconds;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy(): string {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get errorState(): boolean {
    return this.timePeriodPartsForm.invalid && this.touched();
  }

  get value(): TimePeriodData | null {
    return this.currentValue;
  }

  set value(v: TimePeriodData | null) {
    v = v || new TimePeriodData('00', '00', '00');
    this.timePeriodPartsForm.setValue(v);
  }

  writeValue(timePeriod: TimePeriodData | null): void {
    this.value = timePeriod;
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.time-period-picker-input-container'
    );
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  onContainerClick(): void {
    if (!this._focused())
      this._focusMonitor.focusVia(this.hoursInput(), 'program');
  }

  onFocusIn() {
    this.focusNextInput = false;

    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();

      if (!this.isTimePeriodDifferentThanZero(this.currentValue))
        this.timePeriodPartsForm.setErrors({ differentThanZero: false });
    }
  }

  autoFocusElement(element: HTMLInputElement): void {
    this._focusMonitor.focusVia(element, 'program');
  }

  handleKeyDown(
    event: KeyboardEvent,
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ) {
    if (event.key === 'Tab' || event.key === 'Backspace') return;

    event.preventDefault();

    if (isNaN(parseInt(event.key))) return;

    control.setValue((control.value[1] || '0') + event.key);

    if (control.invalid) {
      this.focusNextInput = false;
      return;
    }

    if (this.focusNextInput && nextElement) {
      this.autoFocusElement(nextElement);
      this.focusNextInput = false;
      return;
    }

    this.focusNextInput = true;
  }

  handleBackspace(
    event: Event,
    control: AbstractControl,
    prevElement?: HTMLInputElement
  ) {
    event.preventDefault();

    if (prevElement && control.value === '00') {
      this.autoFocusElement(prevElement);
    }

    control.setValue('00');
    this.focusNextInput = false;
  }

  private areDifferentTimePeriods(
    a: TimePeriodData | null,
    b: TimePeriodData | null
  ) {
    return (
      a?.hours !== b?.hours ||
      a?.minutes !== b?.minutes ||
      a?.seconds !== b?.seconds
    );
  }

  private isTimePeriodDifferentThanZero(v: TimePeriodData) {
    return parseInt(`${v.hours}${v.minutes}${v.seconds}`) !== 0;
  }

  private returnCorrectOrNull() {
    return this.timePeriodPartsForm.valid ? this.currentValue : null;
  }
}
