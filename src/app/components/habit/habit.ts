import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

import { HabitType } from '../../types/habit.type';

@Component({
  selector: 'app-habit',
  imports: [CommonModule, MatCardModule, MatRippleModule],
  templateUrl: './habit.html',
  styleUrl: './habit.scss',
})
export class Habit {
  public habitData = input<HabitType>();
}
