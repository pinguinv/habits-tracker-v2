import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HabitsStore } from '../../store/habits.store';
import { HabitToday } from './habit-today/habit-today';

@Component({
  selector: 'app-today',
  imports: [CommonModule, MatProgressSpinnerModule, HabitToday],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class Today {
  protected readonly store = inject(HabitsStore);

  protected readonly todaysHabits = computed(() =>
    this.store.getTodaysHabits()
  );
}
