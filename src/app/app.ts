import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

import { filter, map } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AddHabitButton } from './components/add-habit-button/add-habit-button';
import { HabitsStore } from './store/habits.store';

type RouteButton = {
  name: string;
  path: string;
};

@Component({
  imports: [
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AddHabitButton,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  private readonly store = inject(HabitsStore);
  private readonly router = inject(Router);

  protected readonly routeButtons: RouteButton[] = [
    { name: 'Today', path: '/' },
    { name: 'Habits', path: '/habits' },
  ];
  // why: to show or hide 'add habit button'
  protected readonly routeSignal = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.urlAfterRedirects)
    ),
    { initialValue: '/' }
  );
  protected readonly displayedPageName = computed<string>(() => {
    const currPath = this.routeSignal();

    for (const routeButton of this.routeButtons) {
      if (routeButton.path === currPath) return routeButton.name;
    }
  });

  protected readonly isDarkTheme = signal(false);
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);

    if (localStorage.getItem('darkTheme')) {
      this.isDarkTheme.set(true);
      document.documentElement.classList.add('dark');
    }
    // remove preload class with plain JS
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 500);

    this.store.fetchData();
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  toggleDarkTheme() {
    this.isDarkTheme.update((v) => !v);
    if (this.isDarkTheme()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkTheme', '1');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('darkTheme');
    }
  }
}
