import { delay, Observable, of } from 'rxjs';

import { HabitType } from '../types/habit.type';

export function getMockDataWithSomeDelay(): Observable<HabitType[]> {
  const habitsData: HabitType[] = [
    {
      id: 0,
      title: 'Drink Water',
      shortDescription: 'Stay hydrated by drinking water regularly.',
      color: 'cyan',
      frequency: 'D',
    },
    {
      id: 1,
      title: 'Read a Book',
      shortDescription: 'Read a chapter to expand knowledge or relax.',
      color: 'violet',
      frequency: 'D',
    },
    {
      id: 2,
      title: 'Evening Walk',
      shortDescription: 'Take a brisk walk to unwind and stay active.',
      color: 'orange',
      frequency: 'W0,2,4,6',
    },
    {
      id: 3,
      title: 'Morning Meditation',
      shortDescription: 'Practice mindfulness to start the day calmly.',
      color: 'red',
      frequency: 'D',
    },
    {
      id: 4,
      title: 'Journal Reflection',
      shortDescription: 'Write down thoughts to reflect and gain clarity.',
      color: 'cyan',
      frequency: 'W0,3,6',
    },
    {
      id: 5,
      title: 'Stretch Break',
      shortDescription: 'Do a quick stretching session to relieve tension.',
      color: 'violet',
      frequency: 'D',
    },
    {
      id: 6,
      title: 'Healthy Snack',
      shortDescription: 'Eat a nutritious snack to boost energy.',
      color: 'orange',
      frequency: 'D',
    },
    {
      id: 7,
      title: 'Deep Breathing',
      shortDescription: 'Practice deep breathing to reduce stress.',
      color: 'red',
      frequency: 'RA1,1',
    },
    {
      id: 8,
      title: 'Plan Tomorrow',
      shortDescription: 'Organize tasks for the next day to stay focused.',
      color: 'cyan',
      frequency: 'D',
    },
    {
      id: 9,
      title: 'Learn Something New',
      shortDescription: 'Spend time learning a new skill or hobby.',
      color: 'violet',
      frequency: 'W1,3,5',
    },
    {
      id: 10,
      title: 'Connect with a Friend',
      shortDescription: 'Call or message a friend to stay connected.',
      color: 'orange',
      frequency: 'RR7',
    },
    {
      id: 11,
      title: 'Gratitude Practice',
      shortDescription: 'List three things you’re grateful for today.',
      color: 'red',
      frequency: 'D',
    },
  ];

  return of(habitsData).pipe(delay(1500));
}
