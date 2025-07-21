import { Component, inject } from '@angular/core';
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
  protected store = inject(HabitsStore);

  constructor() {
    this.store.fetchData();
  }
}
