import {
  Component,
  effect,
  input,
  OnInit,
  output,
  signal,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TimePeriodPicker } from './time-period-picker/time-period-picker';

import { getSpecifiers } from '../../../shared/specifiers';
import { SpecifierSymbols } from '../../../shared/specifier-symbols';
import { greaterThan } from '../../../shared/greater-than.directive';
import { integerOnly } from '../../../shared/integer-only.directive';

import { pickedEvalMethodType } from '../../../types/picked-eval-method.type';
import { SpecifierSymbolType } from '../../../types/specifier.types';

@Component({
  selector: 'app-habit-eval-method-details',
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TimePeriodPicker,
  ],
  templateUrl: './habit-eval-method-details.html',
  styleUrl: './habit-eval-method-details.scss',
})
export class HabitEvalMethodDetails implements OnInit {
  readonly encodedEvalMethodEmit = output<string>();
  readonly pickedEvalMethod = input.required<pickedEvalMethodType>();
  readonly evalMethodInput = input.required<string>();

  // Used in template
  protected readonly numericSpecifiers = getSpecifiers();
  protected readonly timerSpecifiers = getSpecifiers(true);

  // For both: numeric & timer
  protected readonly specifier = signal<SpecifierSymbolType>(
    SpecifierSymbols.AtLeast
  );

  // Numeric
  protected readonly numericGoal = new FormControl<number>(null, [
    Validators.required,
    integerOnly(),
    greaterThan(0),
  ]);
  protected readonly units = signal<string>('');

  // Timer
  protected readonly timerGoal = signal<string>(null);
  protected readonly timerDisabled = signal(false);
  protected readonly timerInput = signal<string | null>(null);

  constructor() {
    // On pickedEvalMethod Change
    effect(() => {
      this.pickedEvalMethod();

      untracked(() => {
        if (this.pickedEvalMethod() === 'Timer' && this.specifier() === 'E')
          this.specifier.set(SpecifierSymbols.AtLeast);
      });
    });

    // On specifier Change
    effect(() => {
      this.specifier();

      untracked(() => {
        if (this.specifier() === 'A') {
          this.numericGoal.disable();
          this.timerDisabled.set(true);
        } else {
          this.numericGoal.enable();
          this.timerDisabled.set(false);
        }
      });
    });

    // On one of these Change
    effect(() => {
      this.timerGoal();
      this.specifier();
      this.units();

      untracked(() => {
        this.emitEncodedEvalMethod();
      });
    });
  }

  ngOnInit(): void {
    const evalMethodInput = this.evalMethodInput();

    if (evalMethodInput === '') return;

    // Decode and set initial data to inputs if provided
    switch (evalMethodInput[0]) {
      case 'N':
        this.decodeNumeric(evalMethodInput);
        break;

      case 'T':
        this.decodeTimer(evalMethodInput);
        break;
    }
  }

  protected emitEncodedEvalMethod(): void {
    let encodedEvalMethod = '';

    switch (this.pickedEvalMethod()) {
      case 'YesNo':
        encodedEvalMethod = 'B';
        break;

      case 'Numeric':
        if (this.numericGoal.invalid && this.specifier() !== 'A') break;

        // 'N{specifier},{units},{value}'
        encodedEvalMethod = `N${this.specifier()},${this.units()},${
          this.specifier() === 'A' ? 0 : this.numericGoal.value
        }`;
        break;

      case 'Timer':
        if (this.timerGoal() === null && this.specifier() != 'A') break;

        // 'T{specifier},{value}'
        encodedEvalMethod = `T${this.specifier()},${
          this.specifier() === 'A' ? 0 : this.timerGoal()
        }`;
        break;

      default:
        encodedEvalMethod = '';
    }

    this.encodedEvalMethodEmit.emit(encodedEvalMethod);
  }

  protected updateTimerGoal(value: string): void {
    this.timerGoal.set(value);
  }

  private decodeNumeric(evalMethodInput: string) {
    this.specifier.set(evalMethodInput[1] as SpecifierSymbolType);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, units, value] = evalMethodInput.split(',');

    this.units.set(units);
    this.numericGoal.setValue(parseInt(value));
  }

  private decodeTimer(evalMethodInput: string) {
    this.specifier.set(evalMethodInput[1] as SpecifierSymbolType);

    this.timerInput.set(evalMethodInput.split(',')[1]);
  }
}
