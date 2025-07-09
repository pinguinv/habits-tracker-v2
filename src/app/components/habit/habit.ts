import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { HabitType } from '../../types/habit.type';
import { HabitDialog, HabitDialogDataType } from '../habit-dialog/habit-dialog';

@Component({
  selector: 'app-habit',
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './habit.html',
  styleUrl: './habit.scss',
})
export class Habit {
  private dialog = inject(MatDialog);
  public habitData = input<HabitType>();

  openEditHabitDialog() {
    const dialogData: HabitDialogDataType = {
      type: 'edit',
      habitData: this.habitData(),
    };

    this.dialog.open(HabitDialog, {
      data: dialogData,
    });
  }
}
