import { Route } from '@angular/router';
import { Habits } from './components/habits/habits';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Habits,
  },
  {
    path: 'achievements',
    loadComponent: () =>
      import('./components/achievements/achievements').then(
        (c) => c.Achievements
      ),
  },
  {
    path: 'charts',
    loadComponent: () =>
      import('./components/charts/charts').then((c) => c.Charts),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
