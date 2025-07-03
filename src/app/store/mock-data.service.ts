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
    {
      id: 4,
      title: 'Journal Reflection',
      shortDescription: 'Write down thoughts to reflect and gain clarity.',
      color: 'cyan',
    },
    {
      id: 5,
      title: 'Stretch Break',
      shortDescription: 'Do a quick stretching session to relieve tension.',
      color: 'magenta',
    },
    {
      id: 6,
      title: 'Healthy Snack',
      shortDescription: 'Eat a nutritious snack to boost energy.',
      color: 'orange',
    },
    {
      id: 7,
      title: 'Deep Breathing',
      shortDescription: 'Practice deep breathing to reduce stress.',
      color: 'yellow',
    },
    {
      id: 8,
      title: 'Plan Tomorrow',
      shortDescription: 'Organize tasks for the next day to stay focused.',
      color: 'cyan',
    },
    {
      id: 9,
      title: 'Learn Something New',
      shortDescription: 'Spend time learning a new skill or hobby.',
      color: 'magenta',
    },
    {
      id: 10,
      title: 'Connect with a Friend',
      shortDescription: 'Call or message a friend to stay connected.',
      color: 'orange',
    },
    {
      id: 11,
      title: 'Gratitude Practice',
      shortDescription: 'List three things you’re grateful for today.',
      color: 'yellow',
    },
  ];

  return of(habitsData).pipe(delay(1500));
}
