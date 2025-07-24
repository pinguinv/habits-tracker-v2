import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/today/today').then((m) => m.Today),
  },
  {
    path: 'habits',
    loadComponent: () =>
      import('./components/habits/habits').then((m) => m.Habits),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
