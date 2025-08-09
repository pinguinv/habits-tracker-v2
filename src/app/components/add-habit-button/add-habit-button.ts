import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { debounce, of, timer } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { HabitDialog } from '../habit-dialog/habit-dialog';
import { HabitDialogDataType } from '../../types/habit-dialog.type';

@Component({
  selector: 'app-add-habit-button',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltip],
  templateUrl: './add-habit-button.html',
  styleUrl: './add-habit-button.scss',
})
export class AddHabitButton {
  readonly route = input.required<string>();

  protected readonly showButton = computed(() => this.route() === '/habits');

  // Conditionally rendering so there is no
  // animation of disabled button sliding out
  // during window resizing/refreshing
  protected readonly renderButton = toSignal(
    toObservable(this.showButton).pipe(
      debounce((v) => (v ? of({}) : timer(550)))
    ),
    { initialValue: true }
  );

  private readonly dialog = inject(MatDialog);

  protected openAddHabitDialog() {
    // Removing focus from button after click
    // To prevent "Blocked aria-hidden ..." warning
    (document.activeElement as HTMLElement).blur();

    const dialogData: HabitDialogDataType = {
      type: 'add',
      habitData: null,
    };

    this.dialog.open(HabitDialog, {
      data: dialogData,
    });
  }
}
