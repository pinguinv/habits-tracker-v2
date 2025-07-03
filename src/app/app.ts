import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { AddHabitButton } from './components/add-habit-button/add-habit-button';

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
    AddHabitButton,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected routeButtons: RouteButton[] = [
    { name: 'Habits', path: '' },
    { name: 'Charts', path: '/charts' },
  ];

  protected isDarkTheme = signal(false);

  ngOnInit(): void {
    // remove preload class with plain JS
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 500);

    if (localStorage.getItem('darkTheme')) {
      this.isDarkTheme.set(true);
      document.body.classList.add('dark');
    }
  }

  toggleDarkTheme() {
    this.isDarkTheme.update((v) => !v);
    if (this.isDarkTheme()) {
      document.body.classList.add('dark');
      localStorage.setItem('darkTheme', '1');
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('darkTheme');
    }
  }
}
