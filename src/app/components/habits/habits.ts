import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HabitsStore } from '../../store/habits.store';
import { Habit } from './habit/habit';

@Component({
  selector: 'app-habits',
  imports: [CommonModule, MatProgressSpinnerModule, Habit],
  templateUrl: './habits.html',
  styleUrl: './habits.scss',
})
export class Habits {
  protected readonly store = inject(HabitsStore);

  protected readonly allHabits = computed(() => this.store.habits());
}
