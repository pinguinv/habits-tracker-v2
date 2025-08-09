import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { HabitDialog } from '../../habit-dialog/habit-dialog';
import { SmallFrequencyDisplay } from './small-frequency-display/small-frequency-display';

import { HabitType } from '../../../types/habit.type';
import { HabitDialogDataType } from '../../../types/habit-dialog.type';

@Component({
  selector: 'app-habit',
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule,
    SmallFrequencyDisplay,
  ],
  templateUrl: './habit.html',
  styleUrl: './habit.scss',
})
export class Habit {
  readonly habitData = input<HabitType>();

  private readonly dialog = inject(MatDialog);

  protected openEditHabitDialog() {
    const dialogData: HabitDialogDataType = {
      type: 'edit',
      habitData: this.habitData(),
    };

    this.dialog.open(HabitDialog, {
      data: dialogData,
    });
  }
}
