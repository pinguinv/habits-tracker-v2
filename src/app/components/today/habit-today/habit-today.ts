import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { HabitType } from '../../../types/habit.type';

@Component({
  selector: 'app-habit-today',
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './habit-today.html',
  styleUrl: './habit-today.scss',
})
export class HabitToday {
  public readonly habitData = input<HabitType>();

  evalHabit() {
    console.log(this.habitData());
  }
}
