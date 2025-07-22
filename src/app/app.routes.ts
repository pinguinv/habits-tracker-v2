import { Route } from '@angular/router';
import { Habits } from './components/habits/habits';
import { Today } from './components/today/today';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Today,
  },
  {
    path: 'habits',
    component: Habits,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
