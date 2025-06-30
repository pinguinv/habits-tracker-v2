import { delay, Observable, of } from 'rxjs';

import { HabitType } from '../types/habit.type';

export function getMockDataWithSomeDelay(): Observable<HabitType[]> {
  const habitsData: HabitType[] = [
    {
      id: 0,
      title: 'Drink Water',
      shortDescription: 'Stay hydrated by drinking water regularly.',
      color: 'cyan',
    },
    {
      id: 1,
      title: 'Read a Book',
      shortDescription: 'Read a chapter to expand knowledge or relax.',
      color: 'magenta',
    },
    {
      id: 2,
      title: 'Evening Walk',
      shortDescription: 'Take a brisk walk to unwind and stay active.',
      color: 'orange',
    },
    {
      id: 3,
      title: 'Morning Meditation',
      shortDescription: 'Practice mindfulness to start the day calmly.',
      color: 'yellow',
    },
  ];

  return of(habitsData).pipe(delay(1500));
}
