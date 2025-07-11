import { Route } from '@angular/router';
import { Habits } from './components/habits/habits';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Habits,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
